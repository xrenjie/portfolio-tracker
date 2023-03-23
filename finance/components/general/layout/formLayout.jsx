import React from 'react';

const indentLevels = {
  0: 'pl-0',
  1: 'pl-2',
  2: 'pl-4',
  3: 'pl-6',
  4: 'pl-8',
  5: 'pl-10',
};

function Body({ title, titleIndent, children, ...props }) {
  return (
    <div
      className="tw-w-full tw-h-full tw-flex tw-flex-col  tw-gap-2 tw-items-start"
      style={{ minHeight: '100%' }}
      {...props}
    >
      <h1 className={indentLevels[titleIndent]}>{title}</h1>
      {children}
    </div>
  );
}

function Section({ title, titleIndent, labelIndent, children, ...props }) {
  return (
    <div
      className="tw-w-full tw-flex tw-flex-col tw-items-start tw-gap-4 tw-pb-2"
      {...props}
    >
      <h2 className={indentLevels[titleIndent]}>{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, indentClass, children }) {
  return (
    <div
      className={`${indentClass} tw-w-full tw-min-h-20 tw-flex tw-justify-between`}
    >
      {label && <span className="tw-font-semibold tw-w-24">{label}</span>}
      <div className="tw-w-full tw-min-h-20 tw-flex tw-flex-row tw-gap-2">
        {children}
      </div>
    </div>
  );
}

function Column({ children }) {
  return (
    <div className="tw-w-full tw-h-auto tw-flex tw-flex-col tw-gap-2">
      {children}
    </div>
  );
}

export { Body, Section, Row, Column };
