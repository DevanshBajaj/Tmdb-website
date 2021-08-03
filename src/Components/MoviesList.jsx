import { useState, useRef, useCallback } from "react";

import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

import useMovies from "../hooks/useMovies";
import Placeholder from "../assets/placeholder.jpg";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

const MoviesList = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [pagesReached, setPagesReached] = useState(false);
	const { movies, hasMore, loading, error } = useMovies(pageNumber);

	const observer = useRef();

	const lastMoviesElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			if (pageNumber === 10) {
				setPagesReached(true);
			} else {
				observer.current = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && hasMore) {
						console.log("intersecting");
						setPageNumber((prevPageNumber) => prevPageNumber + 1);
					}
				});
				if (node) observer.current.observe(node);
				console.log(node);
			}
		},
		[loading, hasMore]
	);

	return (
		<div>
			{movies.map((moviesItem, index) => {
				if (movies.length === index) {
					return (
						<div key={index}>
							<h1>{moviesItem.title}</h1>
						</div>
					);
				} else {
					let url = `https://image.tmdb.org/t/p/w500/${moviesItem.poster_path}`;
					if (url === null) {
						url = Placeholder;
					}
					return (
						<div ref={lastMoviesElementRef} key={index}>
							<img
								style={{ height: "146px", width: "146px" }}
								src={url}
								alt="Image"
							/>
							<h1>{moviesItem.title}</h1>
							<p>Realease Date: {moviesItem.release_date}</p>
							<p>Rating: {moviesItem.vote_average}/10</p>
							<p>{moviesItem.overview}</p>
						</div>
					);
				}
			})}
			{pagesReached ? (
				<h1>Max Pages Reached</h1>
			) : (
				<div>
					<BarLoader
						color="#00a9e0"
						loading={loading}
						css={override}
						size={150}
					/>
					<div>{error && "error..."}</div>
				</div>
			)}
		</div>
	);
};

export default MoviesList;
