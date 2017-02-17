

function v_list(data){
	console.log(data);
	var html = '';
	for (var i = 0; i < data.length; i++) {
		html += '<li style="background:url('+data[i].img[0]+') no-repeat;background-size:cover" >\
					<h3>'+data[i].name+'</h3>\
					<p>'+data[i].class+'</p>\
					<a href="av.html?'+i+'"></a>\
				</li>';
	}
	return html
}

function video(data,n){
	console.log(data[n].url);
	return '<video width="100%" height="100%" preload="auto" poster="'+data[n].img[0]+'" controls >\
				<source src="'+data[n].url+'" type="video/mp4">\
			</video>'
}