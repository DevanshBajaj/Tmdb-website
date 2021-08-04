import { useState, useRef, useCallback } from "react";

import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";
import styled from "styled-components";

import useMovies from "../hooks/useMovies";
import Movies from "./Movies";
import Placeholder from "../assets/placeholder.jpg";

const Wrapper = styled.div`
	padding: 2rem 10rem;

	@media (max-width: 898px) {
		padding: 2rem 2rem;
	}

	@media (max-width: 546px) {
		padding: 2rem 0rem;
	}
`;

const MaxReached = styled.h1`
	color: #b00020;
	font-size: 1.5rem;
	padding: 2rem 0 0 2rem;

	@media (max-width: 649px) {
		font-size: 1.2rem;
	}

	@media (max-width: 546px) {
		font-size: 1rem;
	}
`;

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
			if (pageNumber === 6) {
				setPagesReached(true);
			} else {
				observer.current = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && hasMore) {
						setPageNumber((prevPageNumber) => prevPageNumber + 1);
					}
				});
				if (node) observer.current.observe(node);
			}
		},
		[loading, hasMore]
	);

	return (
		<Wrapper>
			{movies.map((moviesItem, index) => {
				if (movies.length === index) {
					return (
						<Movies
							ref={lastMoviesElementRef}
							key={index}
							id={moviesItem.id}
							title={moviesItem.title}
							release_date={moviesItem.release_date}
							vote_average={moviesItem.vote_average}
							overview={moviesItem.overview}
						/>
					);
				} else {
					let ImageUrl = `https://image.tmdb.org/t/p/w500/${moviesItem.poster_path}`;
					if (ImageUrl === null) {
						ImageUrl = Placeholder;
					}

					let MovieUrl = `https://www.themoviedb.org/movie/${moviesItem.id}`;

					return (
						<Movies
							ref={lastMoviesElementRef}
							key={index}
							id={moviesItem.id}
							title={moviesItem.title}
							imageUrl={ImageUrl}
							movieUrl={MovieUrl}
							release_date={moviesItem.release_date}
							vote_average={moviesItem.vote_average}
							overview={moviesItem.overview}
						/>
					);
				}
			})}
			{pagesReached ? (
				<MaxReached>Max Pages Reached(Currently limited to 6 pages)</MaxReached>
			) : (
				<div>
					<BarLoader
						color="#dee2f1"
						loading={loading}
						css={override}
						size={150}
					/>
					<div>{error && "error..."}</div>
				</div>
			)}
		</Wrapper>
	);
};

export default MoviesList;
