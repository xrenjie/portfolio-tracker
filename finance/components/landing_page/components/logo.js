/* eslint-disable no-nested-ternary */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import Image from 'next/image';
import { Link } from './link';
import logo from '../assets/images/logo.png';

const logoDark = logo;

export default function Logo({ isSticky, light, dark, ...props }) {
  return (
    <Link path="/" sx={styles.logo} {...props}>
      {light ? (
        <Image
          style={{ maxWidth: '200px' }}
          src={logo}
          alt="startup landing logo"
        />
      ) : dark ? (
        <Image
          style={{ maxWidth: '200px' }}
          src={logoDark}
          alt="startup landing logo"
        />
      ) : (
        <Image
          style={{ maxWidth: '200px' }}
          src={isSticky ? logoDark : logo}
          alt="startup landing logo"
        />
      )}
    </Link>
  );
}
const styles = {
  logo: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    maxWidth: '200px',
    img: {
      maxWidth: '200px',
    },
  },
};
