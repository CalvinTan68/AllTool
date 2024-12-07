import { LoadingOutlined } from "@ant-design/icons";
import { Button, Descriptions, Spin, Typography, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";
import { VITE_IP_DETAIL, VITE_IP_DETAIL_TOKEN } from "../../data/constants";

function NetCheck() {
	const [detail, setDetail] = useState({});

	const [loading, setLoading] = useState(false);

	function getNetworkDetails() {
		setLoading(true);
		axios
			.get(VITE_IP_DETAIL + "?token=" + VITE_IP_DETAIL_TOKEN)
			.then((res) => {
				setLoading(false);
				const ipdetail = res.data;
				setDetail(ipdetail);
				message.success("Network data retrieved");
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
				message.error("Failed to retrieve network data");
			});
	}

	useEffect(() => {
		getNetworkDetails();
	}, []);

	const loadingIcon = (
		<LoadingOutlined
			style={{
				fontSize: 22,
			}}
			spin
		/>
	);

	return (
		<>
			<div className="centerized">
				<HomeButton />
				<ContentCard
					title={"Network Checker"}
					description={"Check your network information"}
				>
					<Descriptions column={1} layout="vertical" className="network-data">
						<Descriptions.Item label="IP Address">
							{loading ? (
								<Spin indicator={loadingIcon} />
							) : (
								<>
									<Typography.Text copyable>{detail.ip}</Typography.Text>
								</>
							)}
						</Descriptions.Item>
						<Descriptions.Item label="Provider">
							{loading ? (
								<Spin indicator={loadingIcon} />
							) : (
								<>
									<Typography.Text>{detail.org}</Typography.Text>
								</>
							)}
						</Descriptions.Item>
						<Descriptions.Item label="Country">
							{loading ? (
								<Spin indicator={loadingIcon} />
							) : (
								<>
									<Typography.Text>{detail.country}</Typography.Text>
								</>
							)}
						</Descriptions.Item>
						<Descriptions.Item label="Area">
							{loading ? (
								<Spin indicator={loadingIcon} />
							) : (
								<>
									<Typography.Text>
										{detail.city}, {detail.region}
									</Typography.Text>
								</>
							)}
						</Descriptions.Item>
					</Descriptions>
					<Button
						type="primary"
						size="large"
						className="main-action"
						onClick={getNetworkDetails}
						block
					>
						Refresh Data
					</Button>
				</ContentCard>
			</div>
		</>
	);
}

export default NetCheck;
