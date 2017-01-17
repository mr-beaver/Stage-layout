/**
 * Sample CONTEXT script.
 *
 * @author Stagejs.CLI
 * @created Sun Jan 15 2017 23:49:06 GMT-0800 (PST)
 */
;(function(app){

	app.context('Create', {
		
		template: '@context/create.html',
        //..., normal View options
        
        guard: function(){ // -- [optional]
            //return error to cancel navigation;
            //return '', false, undefined to proceed;
            return;
        },

        //listeners: (after guard) // -- [optional]
        onBeforeNavigateTo: function(){
            //return true to proceed;
            //return false, '', undefined to cancel navigation
            return true;
        },
        onNavigateTo: function(path){ // -- [optional]
            //path == '', undefined means the navigation stopped here.
        },
        onNavigateAway: function(){ // -- [optional]
            //... 
            //if you want to save context status (through localStorage maybe)
        },
        onReady: function(){
            var that = this;
            //show hover view
            this.show('layout', 'Create.Layout');
            //hover event
            /*this.$el.on('mousemove', _.throttle(function(e){
                //prevent default events to be shown
                e.preventDefault();

                //pass current mouse position to hover view
                if(e.ctrlKey){//horizontal only
                    app.coop('create-hover', {
                        x: e.pageX,
                        y: 0
                    });
                }else if(e.shiftKey){//vertical only
                    app.coop('create-hover', {
                        x: 0,
                        y: e.pageY
                    });
                }else{//horizontal and vertical
                    app.coop('create-hover', {
                        x: e.pageX,
                        y: e.pageY
                    });
                }

            }, 100));*/
            //mouse click to set dividers
            /*this.$el.on('click', _.throttle(function(e){
                //prevent default events to be triggered
                e.preventDefault();

                //split div
                var currentX = e.pageX,
                    currentY = e.pageY,
                    height = that.$el.height(),
                    width = that.$el.width();

                var xRatio = currentX / width,
                    yRatio = currentY / height;



            }, 100));*/
        }

	});

})(Application);