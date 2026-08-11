---
title: An access-port baseline that survives review
date: 2026-08-10
excerpt: Turning "configure the switchports the usual way" into a playbook that is idempotent, dry-runnable, and safe to hand to CI.
tags: [ansible, networking, automation]
---

The access edge is where most of the small, repeated, easy-to-get-wrong config
lives: data VLAN, voice VLAN, port-security, BPDU guard. Doing it by hand on
each switch is fine once. It is not fine on the fortieth port, and it is not
fine when someone asks six months later *why* a port is configured that way.

This is the playbook from [`show automation`](/#automation), walked through.

## The shape

```yaml
- name: Access port baseline
  hosts: switches
  gather_facts: false
  connection: network_cli

  vars:
    access_vlan: 20
    voice_vlan: 30
    access_ports:
      - GigabitEthernet0/2
      - GigabitEthernet0/3
      - GigabitEthernet0/4
```

`gather_facts: false` matters here. The default fact gathering assumes a POSIX
host with Python on it; network devices have neither. `connection: network_cli`
tells Ansible to drive the CLI over SSH instead.

## Declare state, do not push commands

The resource modules take the state you want and work out the delta:

```yaml
- name: Apply data and voice VLANs
  cisco.ios.ios_l2_interfaces:
    config: >-
      {{ access_ports
         | map('community.general.dict_kv', 'name')
         | map('combine', {'access': {'vlan': access_vlan},
                           'voice':  {'vlan': voice_vlan}})
         | list }}
    state: merged
```

`state: merged` means "make sure these settings are present, leave everything
else alone". Run it twice and the second run reports no change — that is the
property that makes it safe to run on a schedule.

The `ios_config` task that follows is the escape hatch for settings without a
resource module yet:

```yaml
- name: Harden the access edge
  cisco.ios.ios_config:
    parents: "interface {{ item }}"
    lines:
      - switchport mode access
      - switchport port-security maximum 2
      - switchport port-security violation restrict
      - spanning-tree portfast
      - spanning-tree bpduguard enable
  loop: "{{ access_ports }}"
```

`violation restrict` rather than `shutdown` is deliberate: it drops the
offending frames and increments a counter instead of err-disabling the port.
A misconfigured desk phone should page you, not strand the user.

## Never save blindly

```yaml
- name: Save running-config only if something changed
  cisco.ios.ios_config:
    save_when: changed
```

`save_when: always` writes to NVRAM on every run, which turns a no-op playbook
into flash wear and a meaningless config-change timestamp. `changed` keeps the
audit trail honest.

## Dry run is the whole point

```bash
ansible-playbook -i inventory.yml interfaces.yml --check --diff
```

`--check` makes no changes; `--diff` prints the exact lines that *would* be
sent. That output is what belongs in the change ticket. It is also what CI
runs on every pull request, before anyone touches production:

```yaml
- name: Dry run against the lab
  run: >-
    ansible-playbook -i inventory/lab.yml playbooks/interfaces.yml
    --check --diff
```

## What this buys

The config stops living in someone's head and starts living in git — reviewable,
revertable, and identical across every switch. The playbook is not the
interesting part. The fact that a switchport change now goes through the same
review as a code change is.
