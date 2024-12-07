import { Card, Typography } from "antd";

function ContentCard({ children, title, description }) {
	return (
		<Card
			title={
				<>
					<Typography.Title level={4}>{title}</Typography.Title>
					<Typography>{description}</Typography>
				</>
			}
			className="card-app"
		>
			{children}
		</Card>
	);
}

export default ContentCard;
