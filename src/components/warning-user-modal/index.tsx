import { useDispatch } from "react-redux";
import "./style.scss";
import { logout } from "../../redux/slice/auth";
import { useNavigate } from "react-router-dom";

const WarningUserModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const backLogin = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div className='warning-user-modal'>
      <div className='warning-user-modal__content'>
        <h1>Warning !</h1>
        <p>loremfdslfjds flkdsjfld sfjds Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, vero!</p>
        <button>Call</button>
        <button onClick={backLogin}>Login</button>
      </div>
    </div>
  )
}

export default WarningUserModal