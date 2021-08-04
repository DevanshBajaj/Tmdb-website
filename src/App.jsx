import MoviesList from "./Components/MoviesList";
import styled from "styled-components";

const Wrapper = styled.div`
	margin: 2rem 0;
	background-color: #25252d;
	color: white;
`;

function App() {
	return (
		<Wrapper>
			<MoviesList />
		</Wrapper>
	);
}

export default App;
