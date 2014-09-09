var renderTemplate = function(templateName, data){

	$.get('/templates/' + templateName + '.html').done(function(template){
		return Handlebars.compile(template)(data);
	});


}