/**
 * Sample VIEW script.
 *
 * @author Stagejs.CLI
 * @created Mon Jan 16 2017 00:45:07 GMT-0800 (PST)
 */
;(function(app){

	app.view('Create.Hover', {

		template: '@view/create/hover.html',
		//data: 'url', {} or [],
		coop: ['create-hover'],
		//[editors]: {...},
		//svg: true,
		initialize: function(){},
		//onShow: function(){},
		//onDataRendered: function(){},
		onReady: function(){
			
		},
		onCreateHover: function(position){
			var $el = this.$el;
			//use y to set the position of horizontal line
			$el.find('.horizontal').css({
				top: position.y
			});
			//use x to set the position of vertical line
			$el.find('.vertical').css({
				left: position.x
			});
		},
		actions: {
		//	submit: function(){...},
		//	dosomething: function(){...},
		//	...
		},

	});

})(Application);