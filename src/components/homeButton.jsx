import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
	const navigate = useNavigate();
	return (
		<>
			<Button className="back" onClick={() => navigate(-1)}>
				<HomeOutlined />
				Home
			</Button>
		</>
	);
};

export default HomeButton;
