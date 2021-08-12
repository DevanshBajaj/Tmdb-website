import MoviesList from "./Components/MoviesList";
import useMovies from "./hooks/useMovies";
import styled from "styled-components";
import LottieAnimation from "./Lottie";
import ErrorPage from "./lotties/ErrorPage.json";

const Wrapper = styled.div`
	margin: 2rem 0;
	background-color: #0d132f;
	color: white;
`;
const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14rem 0;
  width: 100%;
  height: 100%;

	@media (max-width: 1024px) {
			margin: 12rem 0;
	}

	@media (max-width: 768px) {
			margin: 12rem 0;
	}

	@media (max-width: 360px) {
			margin: 8rem 0;
	}
`;

function App() {
	const { error } = useMovies();
	return (
		<Wrapper>
			{error ? (
				<Error>
					<LottieAnimation
						lotti={ErrorPage}
						alt="404"
						height={"90%"}
						width={"90%"}
					></LottieAnimation>
				</Error>

			) : (<MoviesList />)}
		</Wrapper>
	);
}

export default App;
