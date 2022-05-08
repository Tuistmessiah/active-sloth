import { ButtonSimple } from '../../components/button-simple/button-simple';
import s from './login.module.scss';

export default function Login() {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h1>Active Sloth</h1>
                <form>
                    <div className={s['form-group']}>
                        <label>Username</label>
                        <input placeholder="..."></input>
                    </div>

                    <div className={s['form-group']}>
                        <label>Password</label>
                        <input placeholder="..."></input>
                    </div>

                    <ButtonSimple content={'Login'} onClick={() => {}} />
                </form>
            </div>
            <div className={s['circle-1']} />
            <div className={s['circle-2']} />
        </div>
    );
}
