import React from 'react';
import { EXPERIENCES, EDUCATION_HISTORY } from '../../constants';
import { RackUnit } from './parts';

/** Career as a syslog: newest first, the way `show logging` prints it. */
export const LogScreen: React.FC<{ start: number }> = ({ start }) => {
  const ccna = EDUCATION_HISTORY.find(e => /ccna/i.test(e.degree));
  const school = EDUCATION_HISTORY.filter(e => e !== ccna);

  return (
    <RackUnit id="logs" start={start} units={5} variant="black" bodyClassName="px-5 md:px-8 py-5">
      <div className="mb-5">
        <span className="silk text-[14px] opacity-70">crt monitor, 15 inch</span>
        <h2 className="silk text-[28px] leading-none text-[#eef0f2] mt-1">Experience</h2>
      </div>

      <div className="crt p-5 md:p-7">
        <p className="text-[20px]">R1# show logging</p>

        <ol className="mt-4 space-y-6 text-[20px] leading-[1.3]">
          {ccna && (
            <li>
              <p>
                <span className="opacity-70">{ccna.period} </span>
                %CERT-5-PASSED: {ccna.degree}
              </p>
              {ccna.verifyUrl && (
                <a
                  href={ccna.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 underline underline-offset-4 hover:text-white"
                >
                  verify on Credly
                </a>
              )}
            </li>
          )}

          {EXPERIENCES.map(e => (
            <li key={e.id}>
              <p>
                <span className="opacity-70">{e.period} </span>
                %SYS-5-CONFIG_I: {e.role}, {e.company}
              </p>
              <ul className="mt-1.5 space-y-1 pl-5 text-[18px] opacity-90 max-w-[92ch]">
                {e.description.map((d, i) => (
                  <li key={i} className="before:content-['-_'] before:opacity-60">
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {school.map(s => (
            <li key={s.id}>
              <p>
                <span className="opacity-70">{s.period} </span>
                %EDU-6-COMPLETE: {s.degree}, {s.institution}
              </p>
              {s.details && <p className="pl-5 text-[18px] opacity-80">{s.details.join(', ')}</p>}
            </li>
          ))}

        </ol>
      </div>
    </RackUnit>
  );
};
