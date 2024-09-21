import { postslist } from "@/lib/utils";
import Homepage from "@/layouts/homepage";

const Home = async () => {
	let articles: BlogItem[] = [];

	try {
		articles = await postslist();
	} catch (error) {
		console.error("Failed to fetch articles:", error);
	}

	return (
		<>
			<Homepage articles={articles} />
		</>
	);
};

export default Home;
