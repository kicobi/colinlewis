// Slide in off-screen content
// Reference: https://github.com/CodyHouse/side-team-member-bio

jQuery(document).ready(function($){
	var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

	// Open a project from the main screen
	// Find the link within the projects section
	$('.section__projects').find('li a').on('click', function(event){
		event.preventDefault();
		var selected_project = $(this).data('type');
		// Make the selected project visible
		$('.project.'+selected_project+'').addClass('slide-in');
		// Trigger the close button and overlay
		$('.project__close').addClass('is-visible');
		$('.project__overlay').addClass('is-visible');

		// Firefox transitions break when parent overflow is changed. Wait for the end of the trasition before adding overflow hidden to the body.
		if( is_firefox ) {
			$('.container').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
		} else {
			$('main').addClass('slide-out');
			$('body').addClass('overflow-hidden');
		}

	});

	// Open a project from inside an open project
	// Find the link within the open .project div
	$('.project').find('a').on('click', function(event){
		event.preventDefault();
		var selected_project = $(this).data('type');
		// Close the visible project
		$('.project').not(':hidden').removeClass('slide-in');
		// Make the new selected project visible
		$('.project.'+selected_project+'').addClass('slide-in');

	});

	// Close a project
	$(document).on('click', '.project__overlay, .project__close', function(event){
		event.preventDefault();
		// Remove classes
		$('.project').removeClass('slide-in');
		$('.project__close').removeClass('is-visible');
		$('.project__overlay').removeClass('is-visible');

		if( is_firefox ) {
			$('main').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('main').removeClass('slide-out');
			$('body').removeClass('overflow-hidden');
		}
	});
});
