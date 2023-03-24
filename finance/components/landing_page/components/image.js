import Image from 'next/image';
import React from 'react';

export default function img({ src, ...rest }) {
  return <Image src={src} {...rest} />;
}
