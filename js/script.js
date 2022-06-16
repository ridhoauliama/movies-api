function searchMovie() {
	$('#movieList').html('');
	$.ajax({
		url: 'http://www.omdbapi.com/',
		type: 'get',
		dataType: 'json',
		data: {
			apikey: '9f42e494',
			s: $('#searchInput').val(),
		},
		success: function (result) {
			if (result.Response == 'True') {
				let movies = result.Search;
				console.log(movies);

				$.each(movies, function (i, data) {
					$('#movieList').append(
						`
            <div class="col-md-4">
              <div class="card mb-3">
              <img src="` +
							data.Poster +
							`" class="card-img-top" alt="Poster">
                <div class="card-body">
                  <h6 class="card-title">` +
							data.Title +
							`</h6>
                  <p class="card-subtitle mb-2 text-muted">` +
							data.Year +
							`</p>
                  <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` +
							data.imdbID +
							`">See Detail</a>
                </div>
              </div>
            </div>
            `
					);
				});

				$('#searchInput').val('');
			} else {
				$('#movieList').html(
					`<div class="col">
          <h1 class="text-center">` +
						result.Error +
						`</h1>
          </div>
          `
				);
			}
		},
	});
}

$('#searchButton').on('click', function () {
	searchMovie();
});

$('#searchInput').on('keyup', function (e) {
	if (e.keyCode === 13) {
		searchMovie();
	}
});

$('#movieList').on('click', '.see-detail', function () {
	$.ajax({
		url: 'http://www.omdbapi.com/',
		type: 'get',
		dataType: 'json',
		data: {
			apikey: '9f42e494',
			i: $(this).data('id'),
		},
		success: function (movie) {
			if (movie.Response === 'True') {
				$('.modal-body').html(
					`<div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
            <img src="` +
						movie.Poster +
						`" class="img-fluid">
						</div>
						<div class="col-md-8">
							<ul class="list-group">
								<li class="list-group-item">
								<h5>` +
						movie.Title +
						`</h5>
								</li>
								<li class="list-group-item">
								<p>Released : ` +
						movie.Released +
						`</p>
								</li>
								<li class="list-group-item">
								<p>Genre : ` +
						movie.Genre +
						`</p>
								</li>
								<li class="list-group-item">
								<p>Director : ` +
						movie.Director +
						`</p>
                </li>
								<li class="list-group-item">
								<p>Actors : ` +
						movie.Actors +
						`</p>
								</li>
							</ul> 
						</div>
					</div>
				</div>
				`
				);
			}
		},
	});
});
