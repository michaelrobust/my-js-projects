/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/

(function($) {
    'use strict';

    // Initialize the application when document is ready
    $(document).ready(function() {
        loadAllShows();
        bindEvents();
    });

    function bindEvents() {
        // Bind search form submission
        $('#searchForm').on('submit', handleSearch);
        
        // Bind home link click to reload page
        $('#homeLink').on('click', function(e) {
            e.preventDefault();
            location.reload();
        });
    }

    // 1. Page load: Load all shows from TV Maze API
    function loadAllShows() {
        // Hide other elements and show loading
        $('#show').hide();
        $('#homeLink').hide();
        $('#showList').empty().show();

        $.ajax({
            url: 'http://api.tvmaze.com/shows',
            method: 'GET',
            dataType: 'json'
        })
        .done(function(data) {
            displayShowList(data);
        })
        .fail(function(xhr, status, error) {
            $('#showList').html('<li>Error loading shows: ' + error + '</li>');
        });
    }

    // 2. Search Form Submission
    function handleSearch(e) {
        e.preventDefault();
        
        const searchTerm = $('#search_term').val().trim();
        
        // Validate input - check for empty or spaces only
        if (!searchTerm) {
            alert('Please enter a search term!');
            return;
        }

        // Clear and show loading
        $('#showList').empty().show();
        $('#show').hide();
        $('#homeLink').show(); // Show home link for search results

        $.ajax({
            url: 'http://api.tvmaze.com/search/shows',
            method: 'GET',
            data: { q: searchTerm },
            dataType: 'json'
        })
        .done(function(data) {
            if (data && data.length > 0) {
                // Extract show data from search results
                const shows = data.map(item => item.show);
                displayShowList(shows);
            } else {
                $('#showList').html('<li>No shows found for "' + searchTerm + '"</li>');
            }
        })
        .fail(function(xhr, status, error) {
            $('#showList').html('<li>Search failed: ' + error + '</li>');
        });
    }

    function displayShowList(shows) {
        const $showList = $('#showList');
        $showList.empty();

        if (!shows || shows.length === 0) {
            $showList.html('<li>No shows to display</li>');
            return;
        }

        shows.forEach(function(show) {
            const $listItem = $('<li>');
            const $link = $('<a>')
                .attr('href', show._links.self.href)
                .text(show.name)
                .on('click', function(e) {
                    e.preventDefault(); // Prevent default link behavior
                    loadShowDetails(show._links.self.href);
                });
            
            $listItem.append($link);
            $showList.append($listItem);
        });
    }

    // 3. Link Clicked: Load individual show details
    function loadShowDetails(showUrl) {
        // Hide show list and show home link
        $('#showList').hide();
        $('#homeLink').show();
        
        // Clear and show loading in show div
        $('#show').html('<p>Loading show details...</p>').show();

        $.ajax({
            url: showUrl,
            method: 'GET',
            dataType: 'json'
        })
        .done(function(data) {
            displayShowDetails(data);
        })
        .fail(function(xhr, status, error) {
            $('#show').html('<p>Error loading show details: ' + error + '</p>');
        });
    }

    function displayShowDetails(show) {
        const $showDiv = $('#show');
        $showDiv.empty();

        // Create show name h1
        const $title = $('<h1>').text(show.name || 'N/A');
        $showDiv.append($title);

        // Create and add image - improved handling
        if (show.image && show.image.medium) {
            const $image = $('<img>')
                .attr('src', show.image.medium)
                .attr('alt', show.name || 'Show Image')
                .on('error', function() {
                    // If image fails to load, replace with placeholder
                    $(this).attr('src', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI5NSIgdmlld0JveD0iMCAwIDMwMCAyOTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjk1IiBmaWxsPSIjQ0NDQ0NDIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTQ3LjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gSW1hZ2UgQXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K');
                });
            $showDiv.append($image);
        } else {
            // Create a placeholder if no image data
            const $placeholder = $('<div>')
                .css({
                    width: '300px',
                    height: '295px',
                    backgroundColor: '#f0f0f0',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666',
                    fontSize: '16px',
                    float: 'left',
                    marginRight: '20px',
                    marginBottom: '20px'
                })
                .text('No Image Available');
            $showDiv.append($placeholder);
        }

        // Create definition list for show properties
        const $dl = $('<dl>');

        // Language
        $dl.append($('<dt>').text('Language:'));
        $dl.append($('<dd>').text(show.language || 'N/A'));

        // Genres
        $dl.append($('<dt>').text('Genres:'));
        if (show.genres && show.genres.length > 0) {
            const $genresList = $('<ul>');
            show.genres.forEach(function(genre) {
                $genresList.append($('<li>').text(genre));
            });
            $dl.append($('<dd>').append($genresList));
        } else {
            $dl.append($('<dd>').text('N/A'));
        }

        // Rating average
        $dl.append($('<dt>').text('Average Rating:'));
        const rating = (show.rating && show.rating.average) ? show.rating.average : 'N/A';
        $dl.append($('<dd>').text(rating));

        // Network name
        $dl.append($('<dt>').text('Network:'));
        let networkName = 'N/A';
        if (show.network && show.network.name) {
            networkName = show.network.name;
        } else if (show.webChannel && show.webChannel.name) {
            networkName = show.webChannel.name;
        }
        $dl.append($('<dd>').text(networkName));

        // Summary
        $dl.append($('<dt>').text('Summary:'));
        let summary = 'N/A';
        if (show.summary) {
            // Remove HTML tags from summary
            summary = show.summary.replace(/<[^>]*>/g, '');
        }
        $dl.append($('<dd>').text(summary));

        $showDiv.append($dl);
    }

})(jQuery);