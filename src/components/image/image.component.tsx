import s from './image.module.scss';

export interface ImageProps {
    src: string;
}

const defaultProps = {} as Required<ImageProps>;

/**
 * DESCRIPTION
 */
export function Image(props: ImageProps) {
    const { src } = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();
    // TODO: Make dark case
    return <img src={src} alt="image" className={s.image} />;
}
