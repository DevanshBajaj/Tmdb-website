import styled from "styled-components";
import { StarIcon } from "@heroicons/react/solid";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CardWrapper = styled.div`
	margin: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 2rem;
	background-color: #2f3147;
	border-radius: 24px;

	@media (max-width: 546px) {
		padding: 1rem;
	}
`;

const MoviePoster = styled.img`
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

const ReleaseDate = styled.p`
	margin: 0;
	margin-top: 0.8rem;
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
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	margin: 0;
	color: #dee2f1;
	margin-top: 0.5rem;
	max-width: 100%;
	overflow: hidden;
	font-size: 1rem;
	text-overflow: ellipsis;

	@media (max-width: 1498px) {
		-webkit-line-clamp: 5;
		font-size: 0.8rem;
	}

	@media (max-width: 649px) {
		-webkit-line-clamp: 4;
	}
`;

const Movies = React.forwardRef((props, ref) => {
	return (
		<CardWrapper ref={ref} key={props.id}>
			<LazyLoadComponent effect="blur">
				<MoviePoster src={props.imageUrl} alt="Image" />
			</LazyLoadComponent>
			<Details>
				<MovieTitle href={props.movieUrl} target={props.id}>
					{props.title}
				</MovieTitle>
				<ReleaseDate>Realease Date: {props.release_date}</ReleaseDate>
				<RatingWrapper>
					<StarIcon
						style={{ color: "#FFC120", width: "20px", height: "20px" }}
					/>
					<Rating>{props.vote_average}/10</Rating>
				</RatingWrapper>
				<Description>{props.overview}</Description>
			</Details>
		</CardWrapper>
	);
});

export default Movies;
