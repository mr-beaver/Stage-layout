/**
 * Sample VIEW script.
 *
 * @author Stagejs.CLI
 * @created Mon Jan 16 2017 22:08:57 GMT-0800 (PST)
 */
;(function(app){

	app.view('Create.Layout', {
		//layout: ['1:outter'],
		template: '@view/create/layout.html',
		//data: 'url', {} or [],
		//coop: ['e', 'e'],
		//[editors]: {...},
		
		initialize: function(){
			this.hoverFlag = true;
		},
		//onShow: function(){},
		//onDataRendered: function(){},
		onReady: function(){
			var that = this,
				$el = this.$el,
				$layouts = $el.find('.layouts');

			//Event: mouse click to add new layout
			$layouts.on('click', app.throttle(function(e){
				//prevent default
				e.preventDefault();

				//constrain such hover movement 
                if(!that.checkConstrain($el.find('#layout-switch-checkbox'), e, $layouts)) return;

                //current element mouse is over
                var $currentOver = $(document.elementFromPoint(e.pageX, e.pageY));

				var x = e.pageX - $currentOver.offset().left || e.pageX, //take first click into account
					y = e.pageY - $currentOver.offset().top || e.pageY,
					width = $currentOver.width(),
					height = $currentOver.height();



				var xRatio = x / width * 100,
					yRatio = y / height * 100,
					layoutConfig = [],
					options = {
						dir: 'v',
						bars: {'flex':'0 0 1px', 'background-color': '#000'},
						adjust: true
					};

				if(e.ctrlKey){//horizontal only
					layoutConfig = [yRatio + ':' + _.uniqueId('region-'), (100 - yRatio) + ':' + _.uniqueId('region-')];
					options.dir = 'h';
				}else if(e.shiftKey){//vertical only
					layoutConfig = [xRatio + ':' + _.uniqueId('region-'), (100 - xRatio) + ':' + _.uniqueId('region-')];
				}else{//horizontal and vertical
					layoutConfig = [
						[xRatio + ':' + _.uniqueId('region-'), [yRatio + ':' + _.uniqueId('region-'), (100 - yRatio) + ':' + _.uniqueId('region-')]], 
						[(100- xRatio) + ':' + _.uniqueId('region-'), [yRatio + ':' + _.uniqueId('region-'), (100 - yRatio) + ':' + _.uniqueId('region-')]]
					];
				}

				$currentOver.flexlayout(layoutConfig, options);
			}));

			//Event: hover show vertical and horizontal lines
			$layouts.on('mousemove', _.throttle(function(e){
                //prevent default events to be shown
                e.preventDefault();

                //constrain such hover movement 
                if(!that.checkConstrain($el.find('#layout-switch-checkbox'), e, $layouts)) return;

                //current element mouse is over
                var $currentOver = $(document.elementFromPoint(e.pageX, e.pageY));

                //pass current mouse position to hover view
                if(e.ctrlKey){//horizontal only
                    that.hoverLines({
                        x: 0,
                        y: e.pageY
                    }, $currentOver);
                }else if(e.shiftKey){//vertical only
                    that.hoverLines({
                        x: e.pageX,
                        y: 0
                    }, $currentOver);
                }else{//horizontal and vertical
                    that.hoverLines({
                        x: e.pageX,
                        y: e.pageY
                    }, $currentOver);
                }

            }, 100));

            //reset horizontal line and vertical line style when unchecked layout box
            $el.find('#layout-switch-checkbox').on('change', function(){
            	if(!$(this).prop('checked')){
            		$el.find('.horizontal-line').css({
						top: 0,
						left: 0,
						right: 0
					});
            		$el.find('.vertical-line').css({
						left: 0,
						top: 0,
						bottom: 0
					});
            	}
            });
		},
		actions: {
		//	submit: function(){...},
		//	dosomething: function(){...},
		//	...
		},
		hoverLines: function(position, $currentEl){
			var $el = this.$el,
				$layouts = $el.find('.layouts'),
				left = $currentEl.offset().left,
				top = $currentEl.offset().top,
				right = left + $currentEl.width(),
				bottom = top + $currentEl.height();

			//use y to set the position of horizontal line
			$el.find('.horizontal-line').css({
				top: position.y,
				left: left + 1, //add one pixel to avoid scrollbar
				right: $layouts.width() - right + 1
			});
			//use x to set the position of vertical line
			$el.find('.vertical-line').css({
				left: position.x,
				top: top + 1,
				bottom: $layouts.height() - bottom + 1
			});
		},
		checkConstrain: function($checkbox, e, $root){
			if(!$checkbox.prop('checked') || e.pageX <= 0 || e.pageX >= $root.width() || e.pageY <= 0 || e.pageY >= $root.height())
				return false;
			else
				return true;
		},
	});

})(Application);