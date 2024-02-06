import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export interface IconsProps extends FontAwesomeIconProps {}

/**
 *
 * @param props
 * @link https://fontawesome.com/search?q=love&o=r&m=free
 * @returns
 */
export default function Icon(props: IconsProps) {
  return <FontAwesomeIcon {...props} />;
}
