#!/usr/bin/env python3
"""Pull running-config from every device in an inventory file, in parallel.

    export NET_USER=... NET_PASS=...
    python backup_configs.py --inventory inventory.yml --out configs/

Exits non-zero if any device failed, so CI can gate on it.
"""
from __future__ import annotations

import argparse
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import yaml
from netmiko import ConnectHandler
from netmiko.exceptions import (
    NetmikoAuthenticationException,
    NetmikoTimeoutException,
)


def fetch(device: dict) -> tuple[str, str | None, str | None]:
    """Return (host, running_config, error). Never raises."""
    host = device["host"]
    params = {
        "device_type": device.get("device_type", "cisco_ios"),
        "host": host,
        "username": os.environ["NET_USER"],
        "password": os.environ["NET_PASS"],
        "read_timeout_override": 60,
    }
    try:
        with ConnectHandler(**params) as conn:
            return host, conn.send_command("show running-config"), None
    except (NetmikoAuthenticationException, NetmikoTimeoutException) as exc:
        return host, None, str(exc)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--inventory", type=Path, default=Path("inventory.yml"))
    parser.add_argument("--out", type=Path, default=Path("configs"))
    parser.add_argument("--workers", type=int, default=8)
    args = parser.parse_args()

    devices = yaml.safe_load(args.inventory.read_text())["devices"]
    args.out.mkdir(parents=True, exist_ok=True)

    failed = 0
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = [pool.submit(fetch, device) for device in devices]
        for future in as_completed(futures):
            host, config, error = future.result()
            if error:
                failed += 1
                print(f"FAIL {host}: {error}")
                continue
            (args.out / f"{host}.cfg").write_text(config)
            print(f"OK   {host}")

    print(f"\n{len(devices) - failed}/{len(devices)} devices backed up")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
