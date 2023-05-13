import "./styles/common.scss";
import { GrMenu } from "react-icons/gr";
import { AiOutlineUser } from "react-icons/AI";
import { SlCalender } from "react-icons/sl";
import { MdAdminPanelSettings } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {LOG_OUT} from '../store/actionTypes'
export default function Sidebar() {
	const path = useLocation();
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch({
			type: LOG_OUT,
		});
		navigate("/login");
	};
	return (
		<div className="position-relative h-100 ">
			<div className="d-flex justify-content-between align-items-center gap-2">
				<h2 className="primary-heading">SCHEDULE</h2>
				<span className="icon">
					<GrMenu color="white" />
				</span>
			</div>
			<div className="d-flex flex-column gap-2 mt-4">
				<Link to="/" className={`${path.pathname === "/" && "menu-item-active"} menu-item`}>
					<span>
						<SlCalender />
					</span>
					<span>Calendar</span>
				</Link>
				{user.role === "admin" && (
					<Link to="/admin" className={`${path.pathname === "/admin" && "menu-item-active"} menu-item`}>
						<span>
							<MdAdminPanelSettings />
						</span>
						<span>Manage Users</span>
					</Link>
				)}
				<Link to="/my-classes" className={`${path.pathname === "/my-classes" && "menu-item-active"} menu-item`}>
					<span>
						<AiOutlineUser />
					</span>
					<span>My Classes</span>
				</Link>
			</div>
			<div className="user-info-panel">
				<div className="user-info">
					<p>{user.name}</p>
					<p>{user.email}</p>
				</div>
				<div className="">
					<FiLogOut
						className="log-out"
						onClick={handleLogout}
					/>
				</div>
			</div>
		</div>
	);
}
