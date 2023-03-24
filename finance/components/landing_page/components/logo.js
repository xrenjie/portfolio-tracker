/* eslint-disable no-nested-ternary */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import Image from 'next/image';
import { Link } from './link';
import logo from '../assets/images/logo.svg';
import logoDark from '../assets/images/logo-dark.svg';

export default function Logo({ isSticky, light, dark, ...props }) {
  return (
    <Link path="/" sx={styles.logo} {...props}>
      {light ? (
        <Image src={logo} alt="startup landing logo" />
      ) : dark ? (
        <Image src={logoDark} alt="startup landing logo" />
      ) : (
        <Image src={isSticky ? logoDark : logo} alt="startup landing logo" />
      )}
    </Link>
  );
}
const styles = {
  logo: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    img: {
      maxWidth: [128, null, '100%'],
    },
  },
};
