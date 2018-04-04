$(
  function(){

var previous = 'first load';
var current = null;

songinfo();

setInterval(function() {
	songinfo();
}, 3000);

function songinfo(){

		if(location.hash == '#play' && $('audio')[0].paused){
			$('audio')[0].play();
			$('#ppbutton').removeClass('icon-play-circled2');
			$('#ppbutton').addClass('icon-pause-circle-o');
		}
		$.getJSON("/song.json", {t: new Date().getTime()}, function(json) {
				current = JSON.stringify(json);            
				if (previous && current && previous !== current) {
					$( "ul#info" ).replaceWith('<ul id="info"><li class="icon-music">'+json.song+'</li><li class="icon-book">'+json.album+'</li><li class="icon-user">'+json.artist+'</li></ul>');
					$( "img#cover" ).replaceWith('<img id="cover" src="'+json.cover+'">');
					$(document).attr("title", 'radio - '+json.artist+' '+json.album+' '+json.song);
				}
				previous = current;
		});                       
}

var aud = $('audio')[0];
$('#ppbutton').on('click', function(){
	if (aud.paused) {
		aud.play();
		$('#ppbutton').removeClass('icon-play-circled2');
		$('#ppbutton').addClass('icon-pause-circle-o');
		location.hash = '#play';
	}
	else {
		aud.pause();
		$('#ppbutton').removeClass('icon-pause-circle-o');
		$('#ppbutton').addClass('icon-play-circled2');
		location.hash = '#stop';
	}
});

});
