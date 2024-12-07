import { Button, Image, Input, message } from "antd";
import { useState } from "react";
import ContentCard from "../../components/contentCard";
import HomeButton from "../../components/homeButton";
import { VITE_QR_GENERATOR } from "../../data/constants";

function QRGenerator() {
	const [inputText, setInputText] = useState("");
	const [qrCode, setQrCode] = useState("");
	const [loading, setLoading] = useState(false);

	const generateQRCode = async () => {
		if (!inputText.trim()) {
			message.error("Please enter text or a link to generate QR Code!");
			return;
		}
		setLoading(true);
		try {
			const encodedText = encodeURIComponent(inputText.trim());
			const apiUrl = `${VITE_QR_GENERATOR}?size=200x200&data=${encodedText}`;
			setQrCode(apiUrl);
			message.success("QR Code generated!");
		} catch (error) {
			console.error("Error generating QR code:", error);
			message.error("Failed to generate QR Code");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e) => {
		setInputText(e.target.value);
		setQrCode("");
	};

	return (
		<div className="centerized">
			<HomeButton />
			<ContentCard title={"QRCode Generator"} description={"Generate QR Code"}>
				<Input.TextArea
					value={inputText}
					onChange={handleInputChange}
					placeholder="Enter text or URL here... (preferably URL)"
					size="large"
					autoSize={{ minRows: 5, maxRows: 5 }}
				/>
				<Button
					onClick={generateQRCode}
					disabled={loading}
					type="primary"
					size="large"
					className="main-action"
					block
				>
					{loading ? "Generating..." : "Generate QR Code"}
				</Button>
				{qrCode && (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 20,
						}}
					>
						<Image src={qrCode} alt="Generated QR Code" preview={false} />
					</div>
				)}
			</ContentCard>
		</div>
	);
}

export default QRGenerator;
