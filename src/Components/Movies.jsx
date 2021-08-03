const Movies = React.forwardRef((props, ref) => {
	return (
		<div ref={ref} key={props.id}>
			<img
				style={{ height: "146px", width: "146px" }}
				src={props.url}
				alt="Image"
			/>
			<h1>{props.title}</h1>
			<p>Realease Date: {props.release_date}</p>
			<p>Rating: {props.vote_average}/10</p>
			<p>{props.overview}</p>
		</div>
	);
});

export default Movies;
