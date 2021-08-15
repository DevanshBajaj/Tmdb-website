import { useEffect, useState } from "react";
import axios from "axios";

export default function useMovies(pageNumber) {
	const apiKey = import.meta.env.VITE_API_KEY;

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [movies, setMovies] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	function sleeper(ms) {
		return function (x) {
			return new Promise(resolve => setTimeout(() => resolve(x), ms));
		};
	}

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: "GET",
			url: "https://api.themoviedb.org/3/movie/top_rated?",
			params: {
				api_key: apiKey,
				language: "en",
				region: "us",
				page: pageNumber,
			},
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then(sleeper(2000)).then((response) => {
				setMovies((prevMovies) => {
					return [...new Set([...prevMovies, ...response.data.results])];
				});
				setHasMore(response.data.results.length > 0);
				setLoading(false);
			})
			.catch((error) => {
				if (axios.isCancel(error)) return;
				setError(true);
			});
		return () => cancel();
	}, [pageNumber]);

	return { loading, error, movies, hasMore };
}
