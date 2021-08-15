import styled, { keyframes } from "styled-components";
import { StarIcon } from "@heroicons/react/solid";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import useMovies from "../hooks/useMovies";
import { Fragment } from "react";

const Loading = keyframes`
	from {
		left: 200px;
	}
	to {
		right: 100%
	}
	`;



const StyledSkeleton = styled.div`
	margin: 2rem;
	position: relative;
	overflow: hidden;
	height: 19.2rem;
	width: 80%;
	background-color: #fafafa;

	::before {
		width: 100%;
		display: block;
		position: absolute;
		top: 0px;
		left: -200px;
		height: 100%;
		width: 200px;
		background: linear-gradient(to right, rgb(248, 248, 248) 0%, rgb(255, 255, 255) 10%, rgb(248, 248, 248) 40%, rgb(248, 248, 248) 100%) no-repeat rgb(248, 248, 248);
		opacity: 0;
		transition: opacity 0.25s ease-out 0s;
		animation: ${Loading} 2000ms ease-in-out infinite;
	}

	@media (max-width: 546px) {
		padding: 0.4rem 1rem;
	}
`;

const CardWrapper = styled.div`
	margin: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 1.2rem 2rem;
	background-color: #2f3147;
	border-radius: 24px;

	@media (max-width: 546px) {
		padding: 0.4rem 1rem;
	}
`;

const MovieWrapper = styled.div`
	height: 14rem;
	width: 12rem;
	border-radius: 12px;

	@media (max-width: 1498px) {
		height: 16rem;
		width: 12rem;
	}

	@media (max-width: 649px) {
		height: 12rem;
		width: 8rem;
	}

	@media (max-width: 546px) {
		height: 8rem;
		width: 6rem;
	}
`;

const MoviePoster = styled.img`
	height: 14rem ;
	width: 9.3rem;
	border-radius: 12px;
	@media (max-width: 1498px) {
		height: 16rem;
		width: 10.6rem;
	}
	@media (max-width: 649px) {
		height: 12rem;
		width: 8rem;
	}
	@media (max-width: 546px) {
		height: 8rem;
		width: 5.4rem;
	}
	@media (max-width: 320px) {
		height: 6rem;
		width: 4rem;
	}
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	width: 100%;
`;

const MovieTitle = styled.a`
	margin: 0;
	font-size: 2.4rem;
	text-decoration: none;
	color: #dee2f1;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;

	@media (max-width: 1498px) {
		font-size: 1.5rem;
	}

	@media (max-width: 649px) {
		font-size: 1.2rem;
	}

	@media (max-width: 546px) {
		font-size: 1rem;
	}
`;

const Genres = styled.p`
	margin: 0;
	margin-top: 0.5rem;
	font-size: 1rem;

	@media (max-width: 1498px) {
		font-size: 0.8rem;
	}

	@media (max-width: 649px) {
		font-size: 0.6rem;
	}
`;

const ReleaseDate = styled.p`
	margin: 0;
	margin-top: 0.5rem;
	font-size: 0.8rem;
	color: #e5e5e5;

	@media (max-width: 1498px) {
		font-size: 0.8rem;
	}

	@media (max-width: 649px) {
		font-size: 0.6rem;
	}
`;

const RatingWrapper = styled.div`
	margin: 0;
	margin-top: 0.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Rating = styled.p`
	margin: 0;
	color: #e5e5e5;
	margin-left: 0.5rem;
	font-size: 0.8rem;
`;

const Description = styled.p`
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	margin: 0;
	color: #dee2f1;
	margin-top: 0.5rem;
	max-width: 100%;
	overflow: hidden;
	font-size: 1rem;
	text-overflow: ellipsis;

	@media (max-width: 1498px) {
		-webkit-line-clamp: 4;
		font-size: 0.8rem;
	}

	@media (max-width: 649px) {
		-webkit-line-clamp: 4;
	}
`;

const Movies = React.forwardRef((props, ref) => {
	const { loading } = useMovies();

	return (
		<Fragment>
			{loading ? (<StyledSkeleton />) : (
				<CardWrapper ref={ref} key={props.id}>
					<LazyLoadComponent effect="blur">
						<MovieWrapper>
							<MoviePoster src={props.imageUrl} alt="Image" />
						</MovieWrapper>
					</LazyLoadComponent>
					<Details>
						<MovieTitle href={props.movieUrl} target={props.id}>
							{props.title}
						</MovieTitle>
						<Genres>{props.genre}</Genres>
						<ReleaseDate>Realease Date: {props.release_date}</ReleaseDate>
						<RatingWrapper>
							<StarIcon
								style={{ color: "#FFC120", width: "20px", height: "20px" }}
							/>
							<Rating>{props.vote_average}/10</Rating>
						</RatingWrapper>
						<Description>{props.overview}</Description>
					</Details>
				</CardWrapper>)}
		</Fragment>

	);
});

export default Movies;
