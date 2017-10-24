var App = function() {

    var currentPage = ''; // current page
    var collapsed = false; //sidebar collapsed
    var is_mobile = false; //is screen mobile?
    var is_mini_menu = false; //is mini-menu activated
    var is_fixed_header = false; //is fixed header activated
    var responsiveFunctions = []; //responsive function holder

    /*-----------------------------------------------------------------------------------*/
    /*	Runs callback functions set by App.addResponsiveFunction()
    /*-----------------------------------------------------------------------------------*/
    var runResponsiveFunctions = function() {
            // reinitialize other subscribed elements
            for (var i in responsiveFunctions) {
                var each = responsiveFunctions[i];
                each.call();
            }
        }
        /*-----------------------------------------------------------------------------------*/
        /*	To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        /*-----------------------------------------------------------------------------------*/
    var getViewPort = function() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            }
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Check layout size
        /*-----------------------------------------------------------------------------------*/
    var checkLayout = function() {
            //Check if sidebar has mini-menu
            is_mini_menu = $('#sidebar').hasClass('mini-menu');
            //Check if fixed header is activated
            is_fixed_header = $('#header').hasClass('navbar-fixed-top');
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Sidebar & Main Content size match
        /*-----------------------------------------------------------------------------------*/
    var handleSidebarAndContentHeight = function() {
            var content = $('#content');
            var sidebar = $('#sidebar');
            var body = $('body');
            var height;

            if (body.hasClass('sidebar-fixed')) {
                height = $(window).height() - $('#header').height() + 1;
            } else {
                height = sidebar.height() + 20;
            }
            if (height >= content.height()) {
                content.attr('style', 'min-height:' + height + 'px !important');
            }
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Sidebar
        /*-----------------------------------------------------------------------------------*/
    var handleSidebar = function() {
        jQuery('.sidebar-menu .has-sub > a').click(function() {
            var last = jQuery('.has-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);

            var thisElement = $(this);
            var slideOffeset = -200;
            var slideSpeed = 200;

            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(slideSpeed, function() {
                    if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                        App.scrollTo(thisElement, slideOffeset);
                    }
                    handleSidebarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(slideSpeed, function() {
                    if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                        App.scrollTo(thisElement, slideOffeset);
                    }
                    handleSidebarAndContentHeight();
                });
            }
        });

        // Handle sub-sub menus
        jQuery('.sidebar-menu .has-sub .sub .has-sub-sub > a').click(function() {
            var last = jQuery('.has-sub-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);

            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200);
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200);
            }
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Collapse Sidebar Programatically
    /*-----------------------------------------------------------------------------------*/
    var collapseSidebar = function() {
            var iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
            var iconLeft = iconElem.getAttribute("data-icon1");
            var iconRight = iconElem.getAttribute("data-icon2");
            /* For Navbar */
            jQuery('.navbar-brand').addClass("mini-menu");
            /* For sidebar */
            jQuery('#sidebar').addClass("mini-menu");
            jQuery('#main-content').addClass("margin-left-50");
            jQuery('.sidebar-collapse i').removeClass(iconLeft);
            jQuery('.sidebar-collapse i').addClass(iconRight);
            /* Remove placeholder from Search Bar */
            jQuery('.search').attr('placeholder', '');
            collapsed = true;
            /* Set a cookie so that mini-sidebar persists */
            $.cookie('mini_sidebar', '1');
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Responsive Sidebar Collapse
        /*-----------------------------------------------------------------------------------*/
    var responsiveSidebar = function() {
            //Handle sidebar collapse on screen width
            var width = $(window).width();
            if (width < 768) {
                is_mobile = true;
                //Hide the sidebar completely
                jQuery('#main-content').addClass("margin-left-0");
            } else {
                is_mobile = false;
                //Show the sidebar completely
                jQuery('#main-content').removeClass("margin-left-0");
                var menu = $('.sidebar');
                if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before resizing
                    menu.slimScroll({
                        destroy: true
                    });
                    menu.removeAttr('style');
                    $('#sidebar').removeAttr('style');
                }
            }
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Sidebar Collapse
        /*-----------------------------------------------------------------------------------*/
    var handleSidebarCollapse = function() {
            var viewport = getViewPort();
            if ($.cookie('mini_sidebar') === '1') {
                /* For Navbar */
                jQuery('.navbar-brand').addClass("mini-menu");
                /* For sidebar */
                jQuery('#sidebar').addClass("mini-menu");
                jQuery('#main-content').addClass("margin-left-50");
                collapsed = true;
            }
            //Handle sidebar collapse on user interaction
            jQuery('.sidebar-collapse').click(function() {
                //Handle mobile sidebar toggle
                if (is_mobile && !(is_mini_menu)) {
                    //If sidebar is collapsed
                    if (collapsed) {
                        jQuery('body').removeClass("slidebar");
                        jQuery('.sidebar').removeClass("sidebar-fixed");
                        //Add fixed top nav if exists
                        if (is_fixed_header) {
                            jQuery('#header').addClass("navbar-fixed-top");
                            jQuery('#main-content').addClass("margin-top-100");
                        }
                        collapsed = false;
                        $.cookie('mini_sidebar', '0');
                    } else {
                        jQuery('body').addClass("slidebar");
                        jQuery('.sidebar').addClass("sidebar-fixed");
                        //Remove fixed top nav if exists
                        if (is_fixed_header) {
                            jQuery('#header').removeClass("navbar-fixed-top");
                            jQuery('#main-content').removeClass("margin-top-100");
                        }
                        collapsed = true;
                        $.cookie('mini_sidebar', '1');
                        handleMobileSidebar();
                    }
                } else { //Handle regular sidebar toggle
                    var iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
                    var iconLeft = iconElem.getAttribute("data-icon1");
                    var iconRight = iconElem.getAttribute("data-icon2");
                    //If sidebar is collapsed
                    if (collapsed) {
                        /* For Navbar */
                        jQuery('.navbar-brand').removeClass("mini-menu");
                        /* For sidebar */
                        jQuery('#sidebar').removeClass("mini-menu");
                        jQuery('#main-content').removeClass("margin-left-50");
                        jQuery('.sidebar-collapse i').removeClass(iconRight);
                        jQuery('.sidebar-collapse i').addClass(iconLeft);
                        /* Add placeholder from Search Bar */
                        jQuery('.search').attr('placeholder', "Search");
                        collapsed = false;
                        $.cookie('mini_sidebar', '0');
                    } else {
                        /* For Navbar */
                        jQuery('.navbar-brand').addClass("mini-menu");
                        /* For sidebar */
                        jQuery('#sidebar').addClass("mini-menu");
                        jQuery('#main-content').addClass("margin-left-50");
                        jQuery('.sidebar-collapse i').removeClass(iconLeft);
                        jQuery('.sidebar-collapse i').addClass(iconRight);
                        /* Remove placeholder from Search Bar */
                        jQuery('.search').attr('placeholder', '');
                        collapsed = true;
                        $.cookie('mini_sidebar', '1');
                    }
                    $("#main-content").on('resize', function(e) {
                        e.stopPropagation();
                    });
                }
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Fixed Sidebar on Mobile devices
        /*-----------------------------------------------------------------------------------*/
    var handleMobileSidebar = function() {
            var menu = $('.sidebar');
            if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
                menu.slimScroll({
                    destroy: true
                });
                menu.removeAttr('style');
                $('#sidebar').removeAttr('style');
            }
            menu.slimScroll({
                size: '7px',
                color: '#a1b2bd',
                opacity: .3,
                height: "100%",
                allowPageScroll: false,
                disableFadeOut: false
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Fixed Sidebar
        /*-----------------------------------------------------------------------------------*/
    var handleFixedSidebar = function() {
            var menu = $('.sidebar-menu');

            if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
                menu.slimScroll({
                    destroy: true
                });
                menu.removeAttr('style');
                $('#sidebar').removeAttr('style');
            }

            if ($('.sidebar-fixed').size() === 0) {
                handleSidebarAndContentHeight();
                return;
            }

            var viewport = getViewPort();
            if (viewport.width >= 992) {
                var sidebarHeight = $(window).height() - $('#header').height() + 1;

                menu.slimScroll({
                    size: '7px',
                    color: '#a1b2bd',
                    opacity: .3,
                    height: sidebarHeight,
                    allowPageScroll: false,
                    disableFadeOut: false
                });
                handleSidebarAndContentHeight();
            }
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Windows Resize function
        /*-----------------------------------------------------------------------------------*/
    jQuery(window).resize(function() {
        setTimeout(function() {
            checkLayout();
            handleSidebarAndContentHeight();
            responsiveSidebar();
            handleFixedSidebar();
            handleNavbarFixedTop();
            runResponsiveFunctions();
        }, 50); // wait 50ms until window resize finishes.
    });
    /*-----------------------------------------------------------------------------------*/
    /*	Date Range Picker
    /*-----------------------------------------------------------------------------------*/


    /*-----------------------------------------------------------------------------------*/
    /*	Team View
    /*-----------------------------------------------------------------------------------*/
    var handleTeamView = function() {
        c();
        $(".team-status-toggle").click(function(y) {
            y.preventDefault();
            w(this);
            $(this).parent().toggleClass("open");
            var z = x(this);
            $(z).slideToggle(200, function() {
                $(this).toggleClass("open")
            })
        });
        $("body").click(function(z) {
            var y = z.target.className.split(" ");
            if ($.inArray("team-status", y) == -1 && $.inArray("team-status-toggle", y) == -1 && $(z.target).parents().index($(".team-status")) == -1 && $(z.target).parents(".team-status-toggle").length == 0) {
                w()
            }
        });
        $(".team-status #teamslider").each(function() {
            $(this).slimScrollHorizontal({
                width: "100%",
                alwaysVisible: true,
                color: "#fff",
                opacity: "0.5",
                size: "5px"
            })
        });
        var w = function(y) {
            $(".team-status").each(function() {
                var z = $(this);
                if (z.is(":visible")) {
                    var A = x(y);
                    if (A != ("#" + z.attr("id"))) {
                        $(this).slideUp(200, function() {
                            $(this).toggleClass("open");
                            $(".team-status-toggle").each(function() {
                                var B = x(this);
                                if (B == ("#" + z.attr("id"))) {
                                    $(this).parent().removeClass("open")
                                }
                            })
                        })
                    }
                }
            })
        };
        var x = function(y) {
            var z = $(y).data("teamStatus");
            if (typeof z == "undefined") {
                z = "#team-status"
            }
            return z
        }
    }
    var c = function() {
        $(".team-status").each(function() {
            var x = $(this);
            x.css("position", "absolute").css("margin-top", "-1000px").show();
            var w = 0;
            $("ul li", this).each(function() {
                w += $(this).outerWidth(true) + 15
            });
            x.css("position", "relative").css("margin-top", "0").hide();
            $("ul", this).width(w)
        })
    };

    /*-----------------------------------------------------------------------------------*/
    /*	Homepage tooltips
    /*-----------------------------------------------------------------------------------*/
    var handleHomePageTooltips = function() {
        //On Hover
        //Default tooltip (Top)
        $('.tip').tooltip();
        //Bottom tooltip
        $('.tip-bottom').tooltip({
            placement: 'bottom'
        });
        //Left tooltip
        $('.tip-left').tooltip({
            placement: 'left'
        });
        //Right tooltip
        $('.tip-right').tooltip({
            placement: 'right'
        });
        //On Focus
        //Default tooltip (Top)
        $('.tip-focus').tooltip({
            trigger: 'focus'
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /* Box tools
    /*-----------------------------------------------------------------------------------*/


    /*-----------------------------------------------------------------------------------*/
    /*	Hubspot messenger
    /*-----------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------*/
    /*	Magic Suggest
    /*-----------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------*/
    /*	Date & Color Picker
    /*-----------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------*/
    /*	Custom tabs
    /*-----------------------------------------------------------------------------------*/


    /*-----------------------------------------------------------------------------------*/
    /*	Nestable Lists
    /*-----------------------------------------------------------------------------------*/
    var handleNestableLists = function() {
            var updateOutput = function(e) {
                var list = e.length ? e : $(e.target),
                    output = list.data('output');
                if (window.JSON) {
                    output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
                } else {
                    output.val('JSON browser support required for this demo.');
                }
            };

            // activate Nestable for list 1
            $('#nestable').nestable({
                    group: 1
                })
                .on('change', updateOutput);

            // activate Nestable for list 2
            $('#nestable2').nestable({
                    group: 1
                })
                .on('change', updateOutput);

            // output initial serialised data
            updateOutput($('#nestable').data('output', $('#nestable-output')));
            updateOutput($('#nestable2').data('output', $('#nestable2-output')));

            $('#nestable-menu').on('click', function(e) {
                var target = $(e.target),
                    action = target.data('action');
                if (action === 'expand-all') {
                    $('.dd').nestable('expandAll');
                }
                if (action === 'collapse-all') {
                    $('.dd').nestable('collapseAll');
                }
            });

            $('#nestable3').nestable();
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Table Cloth
        /*-----------------------------------------------------------------------------------*/
    var handleTablecloth = function() {
            $("#example-dark").tablecloth({
                theme: "dark"
            });
            $("#example-paper").tablecloth({
                theme: "paper",
                striped: true
            });
            $("#example-stats").tablecloth({
                theme: "stats",
                sortable: true,
                condensed: true,
                striped: true,
                clean: true
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Data Tables
        /*-----------------------------------------------------------------------------------*/
    var handleDataTables = function() {
            $('#datatable1').dataTable({
                "sPaginationType": "bs_full"
            });
            $('#datatable2').dataTable({
                "sPaginationType": "bs_full",
                sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
                oTableTools: {
                    aButtons: ["copy", "print", "csv", "xls", "pdf"],
                    sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
                }
            });
            $('.datatable').each(function() {
                var datatable = $(this);
                // SEARCH - Add the placeholder for Search and Turn this into in-line form control
                var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
                search_input.attr('placeholder', 'Search');
                search_input.addClass('form-control input-sm');
                // LENGTH - Inline-Form control
                var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
                length_sel.addClass('form-control input-sm');
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	jqGrid
        /*-----------------------------------------------------------------------------------*/
    var handleJqgrid = function() {
        var grid_data = [
            { id: "1", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "2", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "3", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "4", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "5", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "6", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "7", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "8", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "9", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "10", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "11", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "12", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "13", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "14", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "15", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "16", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "17", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "18", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "19", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "20", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "21", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "22", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "23", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "24", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" },
            { id: "25", invdate: "2007-12-03", name: "Client1", amount: "1000.00", tax: "140.00", total: "1000.00", note: "This is a note" }
        ];
        jQuery("#rowed3").jqGrid({
            data: grid_data,
            datatype: "local",
            height: 250,
            colNames: ['Inv No', 'Date', 'Client', 'Amount', 'Tax', 'Total', 'Notes'],
            colModel: [{
                name: 'id',
                index: 'id',
                width: 55
            }, {
                name: 'invdate',
                index: 'invdate',
                width: 90,
                editable: true
            }, {
                name: 'name',
                index: 'name',
                width: 100,
                editable: true
            }, {
                name: 'amount',
                index: 'amount',
                width: 80,
                align: "right",
                editable: true
            }, {
                name: 'tax',
                index: 'tax',
                width: 80,
                align: "right",
                editable: true
            }, {
                name: 'total',
                index: 'total',
                width: 80,
                align: "right",
                editable: true
            }, {
                name: 'note',
                index: 'note',
                width: 150,
                sortable: false,
                editable: true
            }],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#prowed3',
            sortname: 'id',
            viewrecords: true,
            sortorder: "asc",
            editurl: "server.html",
            caption: "Inline navigator",
            autowidth: true
        });
        jQuery("#rowed3").jqGrid('navGrid', "#prowed3", {
            edit: false,
            add: false,
            del: false
        });
        jQuery("#rowed3").jqGrid('inlineNav', "#prowed3");
        /* Add tooltips */
        $('.navtable .ui-pg-button').tooltip({ container: 'body' });
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Typeahead
    /*-----------------------------------------------------------------------------------*/
    var handleTypeahead = function() {
            $('#autocomplete-example').typeahead({
                name: 'countries',
                local: ["red", "blue", "green", "yellow", "brown", "black"]
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Autosize
        /*-----------------------------------------------------------------------------------*/
    var handleAutosize = function() {
            $('textarea.autosize').autosize();
            $('textarea.autosize').addClass('textarea-transition');
        }
        /*-----------------------------------------------------------------------------------*/
        /*	jquery Counatble
        /*-----------------------------------------------------------------------------------*/
    var handleCountable = function() {
            $('.countable').simplyCountable();
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Select2
        /*-----------------------------------------------------------------------------------*/
    var handleSelect2 = function() {
            function movieFormatResult(movie) {
                var markup = "<table class='movie-result'><tr>";
                if (movie.posters !== undefined && movie.posters.thumbnail !== undefined) {
                    markup += "<td class='movie-image'><img src='" + movie.posters.thumbnail + "'/></td>";
                }
                markup += "<td class='movie-info'><div class='movie-title'>" + movie.title + "</div>";
                if (movie.critics_consensus !== undefined) {
                    markup += "<div class='movie-synopsis'>" + movie.critics_consensus + "</div>";
                } else if (movie.synopsis !== undefined) {
                    markup += "<div class='movie-synopsis'>" + movie.synopsis + "</div>";
                }
                markup += "</td></tr></table>"
                return markup;
            }

            function movieFormatSelection(movie) {
                return movie.title;
            }
            /* Basic */
            $("#e1").select2();
            /* Multi-Value Select Boxes */
            $("#e2").select2();
            /* With Placeholders */
            $("#e3").select2({
                placeholder: "Select a State",
                allowClear: true
            });
            /* With Placeholders */
            $("#e4").select2({
                placeholder: "Select a State"
            });
            /* Minimum Input */
            $("#e5").select2({
                placeholder: "Select 2 characters",
                minimumInputLength: 2
            });
            /* Maximum Selection Size */
            $("#e6").select2({
                placeholder: "Select a maximum of 3 states",
                maximumSelectionSize: 3
            });
            /* Loading Remote Data */
            $("#e7").select2({
                placeholder: "Search for a movie",
                minimumInputLength: 1,
                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                    url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                    dataType: 'jsonp',
                    data: function(term, page) {
                        return {
                            q: term, // search term
                            page_limit: 10,
                            apikey: "uekzdmffsrmqzwdtcgmc5yu9" //please do not copy API. Use your own. Copying will be treated as a violation - Cloud Admin Author
                        };
                    },
                    results: function(data, page) { // parse the results into the format expected by Select2.
                        // since we are using custom formatting functions we do not need to alter remote JSON data
                        return { results: data.movies };
                    }
                },
                initSelection: function(element, callback) {
                    // the input tag has a value attribute preloaded that points to a preselected movie's id
                    // this function resolves that id attribute to an object that select2 can render
                    // using its formatResult renderer - that way the movie name is shown preselected
                    var id = $(element).val();
                    if (id !== "") {
                        $.ajax("http://api.rottentomatoes.com/api/public/v1.0/movies/" + id + ".json", {
                            data: {
                                apikey: "uekzdmffsrmqzwdtcgmc5yu9" //please do not copy API. Use your own. Copying will be treated as a violation - Cloud Admin Author
                            },
                            dataType: "jsonp"
                        }).done(function(data) { callback(data); });
                    }
                },
                formatResult: movieFormatResult, // omitted for brevity, see the source of this page
                formatSelection: movieFormatSelection, // omitted for brevity, see the source of this page
                dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
                escapeMarkup: function(m) { return m; } // we do not want to escape markup since we are displaying html in results
            });
            /* Tagging Support */
            $("#e8").select2({
                tags: ["red", "green", "blue"]
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Uniform
        /*-----------------------------------------------------------------------------------*/
    var handleUniform = function() {
            $(".uniform").uniform();
        }
        /*-----------------------------------------------------------------------------------*/
        /*	All Checkboxes
        /*-----------------------------------------------------------------------------------*/
    var handleAllUniform = function() {
            $("select, input[type='checkbox']").uniform();
        }
        /*-----------------------------------------------------------------------------------*/
        /*	BT Wysiwyg
        /*-----------------------------------------------------------------------------------*/
    var handleWysiwyg = function() {
            /* Init Bootstrap WYSIWYG */
            function initToolbarBootstrapBindings() {
                var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                        'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                        'Times New Roman', 'Verdana'
                    ],
                    fontTarget = $('[title=Font]').siblings('.dropdown-menu');
                $.each(fonts, function(idx, fontName) {
                    fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
                });
                $('a[title]').tooltip({ container: 'body' });
                $('.dropdown-menu input').click(function() { return false; })
                    .change(function() { $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle'); })
                    .keydown('esc', function() {
                        this.value = '';
                        $(this).change();
                    });

                $('[data-role=magic-overlay]').each(function() {
                    var overlay = $(this),
                        target = $(overlay.data('target'));
                    overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
                });
                if ("onwebkitspeechchange" in document.createElement("input")) {
                    var editorOffset = $('#editor').offset();
                    $('#voiceBtn').css('position', 'absolute').offset({ top: editorOffset.top, left: editorOffset.left + $('#editor').innerWidth() - 35 });
                } else {
                    $('#voiceBtn').hide();
                }
            };

            function showErrorAlert(reason, detail) {
                var msg = '';
                if (reason === 'unsupported-file-type') { msg = "Unsupported format " + detail; } else {
                    console.log("error uploading file", reason, detail);
                }
                $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
            };
            initToolbarBootstrapBindings();
            $('#editor').wysiwyg({ fileUploadError: showErrorAlert });
            /* Disable auto-inline */
            CKEDITOR.disableAutoInline = true;
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Dropzone
        /*-----------------------------------------------------------------------------------*/
    var handleDropzone = function() {
            try {
                $(".dropzone").dropzone({
                    paramName: "file", // The name that will be used to transfer the file
                    maxFilesize: 0.5, // MB

                    addRemoveLinks: true,
                    dictResponseError: 'Error while uploading file!',

                    //change the previewTemplate to use Bootstrap progress bars
                    previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-sm progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>"
                });
            } catch (e) {
                alert('Dropzone.js does not support older browsers!');
            }
        }
        /*-----------------------------------------------------------------------------------*/
        /*	XCharts
        /*-----------------------------------------------------------------------------------*/
    var handleXcharts = function() {

            //Dynamic Chart
            function chart1() {
                var data = [{ "xScale": "ordinal", "comp": [], "main": [{ "className": ".main.l1", "data": [{ "y": 15, "x": "2012-11-19T00:00:00" }, { "y": 11, "x": "2012-11-20T00:00:00" }, { "y": 8, "x": "2012-11-21T00:00:00" }, { "y": 10, "x": "2012-11-22T00:00:00" }, { "y": 1, "x": "2012-11-23T00:00:00" }, { "y": 6, "x": "2012-11-24T00:00:00" }, { "y": 8, "x": "2012-11-25T00:00:00" }] }, { "className": ".main.l2", "data": [{ "y": 29, "x": "2012-11-19T00:00:00" }, { "y": 33, "x": "2012-11-20T00:00:00" }, { "y": 13, "x": "2012-11-21T00:00:00" }, { "y": 16, "x": "2012-11-22T00:00:00" }, { "y": 7, "x": "2012-11-23T00:00:00" }, { "y": 18, "x": "2012-11-24T00:00:00" }, { "y": 8, "x": "2012-11-25T00:00:00" }] }], "type": "line-dotted", "yScale": "linear" }, { "xScale": "ordinal", "comp": [], "main": [{ "className": ".main.l1", "data": [{ "y": 12, "x": "2012-11-19T00:00:00" }, { "y": 18, "x": "2012-11-20T00:00:00" }, { "y": 8, "x": "2012-11-21T00:00:00" }, { "y": 7, "x": "2012-11-22T00:00:00" }, { "y": 6, "x": "2012-11-23T00:00:00" }, { "y": 12, "x": "2012-11-24T00:00:00" }, { "y": 8, "x": "2012-11-25T00:00:00" }] }, { "className": ".main.l2", "data": [{ "y": 29, "x": "2012-11-19T00:00:00" }, { "y": 33, "x": "2012-11-20T00:00:00" }, { "y": 13, "x": "2012-11-21T00:00:00" }, { "y": 16, "x": "2012-11-22T00:00:00" }, { "y": 7, "x": "2012-11-23T00:00:00" }, { "y": 18, "x": "2012-11-24T00:00:00" }, { "y": 8, "x": "2012-11-25T00:00:00" }] }], "type": "cumulative", "yScale": "linear" }, { "xScale": "ordinal", "comp": [], "main": [{ "className": ".main.l1", "data": [{ "y": 12, "x": "2012-11-19T00:00:00" }, { "y": 18, "x": "2012-11-20T00:00:00" }, { "y": 8, "x": "2012-11-21T00:00:00" }, { "y": 7, "x": "2012-11-22T00:00:00" }, { "y": 6, "x": "2012-11-23T00:00:00" }, { "y": 12, "x": "2012-11-24T00:00:00" }, { "y": 8, "x": "2012-11-25T00:00:00" }] }, { "className": ".main.l2", "data": [{ "y": 29, "x": "2012-11-19T00:00:00" }, { "y": 33, "x": "2012-11-20T00:00:00" }, { "y": 13, "x": "2012-11-21T00:00:00" }, { "y": 16, "x": "2012-11-22T00:00:00" }, { "y": 7, "x": "2012-11-23T00:00:00" }, { "y": 18, "x": "2012-11-24T00:00:00" }, { "y": 8, "x": "2012-11-25T00:00:00" }] }], "type": "bar", "yScale": "linear" }];
                var order = [0, 1, 0, 2],
                    i = 0,
                    xFormat = d3.time.format('%A'),
                    chart = new xChart('line-dotted', data[order[i]], '#chart1', {
                        axisPaddingTop: 5,
                        dataFormatX: function(x) {
                            return new Date(x);
                        },
                        tickFormatX: function(x) {
                            return xFormat(x);
                        },
                        timing: 1250
                    }),
                    rotateTimer,
                    toggles = d3.selectAll('.multi button'),
                    t = 3500;

                function updateChart(i) {
                    var d = data[i];
                    chart.setData(d);
                    toggles.classed('toggled', function() {
                        return (d3.select(this).attr('data-type') === d.type);
                    });
                    return d;
                }

                toggles.on('click', function(d, i) {
                    clearTimeout(rotateTimer);
                    updateChart(i);
                });

                function rotateChart() {
                    i += 1;
                    i = (i >= order.length) ? 0 : i;
                    var d = updateChart(order[i]);
                    rotateTimer = setTimeout(rotateChart, t);
                }
                rotateTimer = setTimeout(rotateChart, t);
            }

            //Time-Series Line
            function chart2() {
                var data = {
                    "xScale": "time",
                    "yScale": "linear",
                    "type": "line",
                    "main": [{
                        "className": ".pizza",
                        "data": [{
                                "x": "2012-11-05",
                                "y": 1
                            },
                            {
                                "x": "2012-11-06",
                                "y": 6
                            },
                            {
                                "x": "2012-11-07",
                                "y": 13
                            },
                            {
                                "x": "2012-11-08",
                                "y": -3
                            },
                            {
                                "x": "2012-11-09",
                                "y": -4
                            },
                            {
                                "x": "2012-11-10",
                                "y": 9
                            },
                            {
                                "x": "2012-11-11",
                                "y": 6
                            }
                        ]
                    }]
                };
                var opts = {
                    "dataFormatX": function(x) { return d3.time.format('%Y-%m-%d').parse(x); },
                    "tickFormatX": function(x) { return d3.time.format('%A')(x); }
                };
                var myChart = new xChart('line', data, '#chart2', opts);
            }

            function chart3() {
                var tt = document.createElement('div'),
                    leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
                    topOffset = -32;
                tt.className = 'ex-tooltip';
                document.body.appendChild(tt);

                var data = {
                    "xScale": "time",
                    "yScale": "linear",
                    "main": [{
                        "className": ".pizza",
                        "data": [{
                                "x": "2012-11-05",
                                "y": 6
                            },
                            {
                                "x": "2012-11-06",
                                "y": 6
                            },
                            {
                                "x": "2012-11-07",
                                "y": 8
                            },
                            {
                                "x": "2012-11-08",
                                "y": 3
                            },
                            {
                                "x": "2012-11-09",
                                "y": 4
                            },
                            {
                                "x": "2012-11-10",
                                "y": 9
                            },
                            {
                                "x": "2012-11-11",
                                "y": 6
                            }
                        ]
                    }]
                };
                var opts = {
                    "dataFormatX": function(x) { return d3.time.format('%Y-%m-%d').parse(x); },
                    "tickFormatX": function(x) { return d3.time.format('%A')(x); },
                    "mouseover": function(d, i) {
                        var pos = $(this).offset();
                        $(tt).text(d3.time.format('%A')(d.x) + ': ' + d.y)
                            .css({ top: topOffset + pos.top, left: pos.left + leftOffset })
                            .show();
                    },
                    "mouseout": function(x) {
                        $(tt).hide();
                    }
                };
                var myChart = new xChart('line-dotted', data, '#chart3', opts);
            }

            function chart4() {
                var data = {
                    "xScale": "ordinal",
                    "yScale": "linear",
                    "main": [{
                        "className": ".pizza",
                        "data": [{
                                "x": "Pepperoni",
                                "y": 4
                            },
                            {
                                "x": "Cheese",
                                "y": 8
                            }
                        ]
                    }]
                };
                var myChart = new xChart('bar', data, '#chart4');
            }

            function chart5() {
                var data = {
                    "xScale": "ordinal",
                    "yScale": "linear",
                    "main": [{
                            "className": ".pizza",
                            "data": [{
                                    "x": "Pepperoni",
                                    "y": 4
                                },
                                {
                                    "x": "Cheese",
                                    "y": 8
                                }
                            ]
                        },
                        {
                            "className": ".pizza",
                            "data": [{
                                    "x": "Pepperoni",
                                    "y": 6
                                },
                                {
                                    "x": "Cheese",
                                    "y": 5
                                }
                            ]
                        }
                    ]
                };
                var myChart = new xChart('bar', data, '#chart5');
            }

            function chart6() {
                var errorBar = {
                    enter: function(self, storage, className, data, callbacks) {
                        var insertionPoint = xChart.visutils.getInsertionPoint(9),
                            container,
                            // Map each error bar into 3 points, so it's easier to draw as a single path
                            // Converts each point to a triplet with y from (y - e) to (y + e)
                            // It would be better to use the `preUpdateScale` method here,
                            // but for this quick example, we're taking a shortcut :)
                            eData = data.map(function(d) {
                                d.data = d.data.map(function(d) {
                                    return [{ x: d.x, y: d.y - d.e }, { x: d.x, y: d.y }, { x: d.x, y: d.y + d.e }];
                                });
                                return d;
                            }),
                            paths;

                        // It's always a good idea to create containers for sets
                        container = self._g.selectAll('.errorLine' + className)
                            .data(eData, function(d) {
                                return d.className;
                            });

                        // The insertionPoint is a special method that helps us insert this
                        // vis at a particular z-index
                        // In this case, we've chosen the highest point (above everything else)
                        container.enter().insert('g', insertionPoint)
                            .attr('class', function(d, i) {
                                return 'errorLine' + className.replace(/\./g, ' ') +
                                    ' color' + i;
                            });

                        // Tell each path about its data
                        // and ensure we reuse any previously drawn item
                        paths = container.selectAll('path')
                            .data(function(d) {
                                return d.data;
                            }, function(d) {
                                return d[0].x;
                            });

                        paths.enter().insert('path')
                            .style('opacity', 0)
                            .attr('d', d3.svg.line()
                                .x(function(d) {
                                    // We offset by half the rangeBand, because this is a bar chart
                                    return self.xScale(d.x) + self.xScale.rangeBand() / 2;
                                })
                                .y(function(d) { return self.yScale(d.y); })
                            );

                        storage.containers = container;
                        storage.paths = paths;
                    },
                    update: function(self, storage, timing) {
                        // This is mostly duplication to the d3.svg.line from the enter() method
                        storage.paths.transition().duration(timing)
                            .style('opacity', 1)
                            .attr('d', d3.svg.line()
                                .x(function(d) {
                                    return self.xScale(d.x) + self.xScale.rangeBand() / 2;
                                })
                                .y(function(d) { return self.yScale(d.y); })
                            );
                    },
                    exit: function(self, storage, timing) {
                        storage.paths.exit()
                            .transition().duration(timing)
                            .style('opacity', 0);
                    },
                    destroy: function(self, storage, timing) {
                        storage.paths.transition().duration(timing)
                            .style('opacity', 0)
                            .remove();
                    }
                };

                xChart.setVis('error', errorBar);

                var data = [{
                        "xScale": "ordinal",
                        "yScale": "linear",
                        "main": [{
                            "className": ".errorExample",
                            "data": [{
                                    "x": "Ponies",
                                    "y": 12
                                },
                                {
                                    "x": "Unicorns",
                                    "y": 23
                                },
                                {
                                    "x": "Trolls",
                                    "y": 1
                                }
                            ]
                        }],
                        "comp": [{
                            "type": "error",
                            "className": ".comp.errorBar",
                            "data": [{
                                    "x": "Ponies",
                                    "y": 12,
                                    "e": 5
                                },
                                {
                                    "x": "Unicorns",
                                    "y": 23,
                                    "e": 2
                                },
                                {
                                    "x": "Trolls",
                                    "y": 1,
                                    "e": 1
                                }
                            ]
                        }]
                    },
                    {
                        "xScale": "ordinal",
                        "yScale": "linear",
                        "main": [{
                            "className": ".errorExample",
                            "data": [{
                                    "x": "Ponies",
                                    "y": 76
                                },
                                {
                                    "x": "Unicorns",
                                    "y": 45
                                },
                                {
                                    "x": "Trolls",
                                    "y": 82
                                }
                            ]
                        }],
                        "comp": [{
                            "type": "error",
                            "className": ".comp.errorBar",
                            "data": [{
                                    "x": "Ponies",
                                    "y": 76,
                                    "e": 12
                                },
                                {
                                    "x": "Unicorns",
                                    "y": 45,
                                    "e": 3
                                },
                                {
                                    "x": "Trolls",
                                    "y": 82,
                                    "e": 12
                                }
                            ]
                        }]
                    }
                ];

                var myChart = new xChart('bar', data[0], '#chart6'),
                    i = 0;

                function timer() {
                    setTimeout(function() {
                        timer();
                        i += 1;
                        myChart.setData(data[i % 2]);
                    }, 3000);
                }
                timer();
            }

            //Run all charts
            chart1();
            chart2();
            chart3();
            chart4();
            chart5();
            chart6();
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Justgage
        /*-----------------------------------------------------------------------------------*/
    var handleGage = function() {
            var g1, g2, g3, g4, g5, g6;

            window.onload = function() {
                var g1 = new JustGage({
                    id: "g1",
                    value: getRandomInt(0, 100),
                    min: 0,
                    max: 100,
                    title: "Custom Width",
                    label: "",
                    gaugeWidthScale: 0.2
                });

                var g2 = new JustGage({
                    id: "g2",
                    value: getRandomInt(0, 100),
                    min: 0,
                    max: 100,
                    title: "Custom Shadow",
                    label: "",
                    shadowOpacity: 1,
                    shadowSize: 0,
                    shadowVerticalOffset: 4
                });

                var g3 = new JustGage({
                    id: "g3",
                    value: getRandomInt(0, 100),
                    min: 0,
                    max: 100,
                    title: "Custom Colors",
                    label: "",
                    levelColors: [Theme.colors.red, Theme.colors.yellow, Theme.colors.green]
                });

                var g4 = new JustGage({
                    id: "g4",
                    value: getRandomInt(0, 100),
                    min: 0,
                    max: 100,
                    title: "Hide Labels",
                    showMinMax: false
                });


                var g5 = new JustGage({
                    id: "g5",
                    value: getRandomInt(0, 100),
                    min: 0,
                    max: 100,
                    title: "Animation Type",
                    label: "",
                    startAnimationTime: 2000,
                    startAnimationType: ">",
                    refreshAnimationTime: 1000,
                    refreshAnimationType: "bounce"
                });

                var g6 = new JustGage({
                    id: "g6",
                    value: getRandomInt(0, 100),
                    min: 0,
                    max: 100,
                    title: "Minimal",
                    label: "",
                    showMinMax: false,
                    gaugeColor: "#E6E6E6",
                    levelColors: ["#555555"],
                    showInnerShadow: false,
                    startAnimationTime: 1,
                    startAnimationType: "linear",
                    refreshAnimationTime: 1,
                    refreshAnimationType: "linear"
                });

                setInterval(function() {
                    g1.refresh(getRandomInt(0, 100));
                    g2.refresh(getRandomInt(0, 100));
                    g3.refresh(getRandomInt(0, 100));
                    g4.refresh(getRandomInt(0, 100));
                    g5.refresh(getRandomInt(0, 100));
                    g6.refresh(getRandomInt(0, 100));
                }, 2500);
            };
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Easy Pie chart
        /*-----------------------------------------------------------------------------------*/
    var handleEasyPie = function() {
            //Pie 1
            $('#pie_1').easyPieChart({
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
                lineWidth: 3,
                barColor: '#A8BC7B'
            });
            var chart1 = window.chart = $('#pie_1').data('easyPieChart');
            $('#js_update_1').on('click', function() {
                chart1.update(Math.random() * 100);
            });

            //Pie 2
            $('#pie_2').easyPieChart({
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
                lineWidth: 6,
                barColor: '#F0AD4E'
            });
            var chart2 = window.chart = $('#pie_2').data('easyPieChart');
            $('#js_update_2').on('click', function() {
                chart2.update(Math.random() * 100);
            });

            //Pie 3
            $('#pie_3').easyPieChart({
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
                lineWidth: 9,
                barColor: '#D9534F'
            });
            var chart3 = window.chart = $('#pie_3').data('easyPieChart');
            $('#js_update_3').on('click', function() {
                chart3.update(Math.random() * 100);
            });

            //Pie 4
            $('#pie_4').easyPieChart({
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
                lineWidth: 12,
                barColor: '#70AFC4',
                lineCap: 'butt'
            });
            var chart4 = window.chart = $('#pie_4').data('easyPieChart');
            $('#js_update_4').on('click', function() {
                chart4.update(Math.random() * 100);
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Easy Pie chart for profile
        /*-----------------------------------------------------------------------------------*/
    var handleProfileSkillPie = function() {

            //Pie 1
            $('#pie_1').easyPieChart({
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent) + "%");
                },
                lineWidth: 6,
                barColor: '#F0AD4E'
            });
            var chart1 = window.chart = $('#pie_1').data('easyPieChart');

            //Pie 2
            $('#pie_2').easyPieChart({
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent) + "%");
                },
                lineWidth: 6,
                barColor: '#D9534F'
            });
            var chart2 = window.chart = $('#pie_2').data('easyPieChart');

            //Pie 3
            $('#pie_3').easyPieChart({
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent) + "%");
                },
                lineWidth: 6,
                barColor: '#70AFC4'
            });
            var chart3 = window.chart = $('#pie_3').data('easyPieChart');
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Sparklines
        /*-----------------------------------------------------------------------------------*/
    var handleSparkline = function() {
            //Sparkline bar
            $(".sparkline").each(function() {
                var barSpacing, barWidth, color, height;
                color = $(this).attr("data-color") || "red";
                height = "18px";
                if ($(this).hasClass("big")) {
                    barWidth = "5px";
                    barSpacing = "2px";
                    height = "40px";
                }
                return $(this).sparkline("html", {
                    type: "bar",
                    barColor: Theme.colors[color],
                    height: height,
                    barWidth: barWidth,
                    barSpacing: barSpacing,
                    zeroAxis: false
                });
            });
            //Sparkline Pie
            $(".sparklinepie").each(function() {
                var height;
                height = "50px";
                if ($(this).hasClass("big")) {
                    height = "70px";
                }
                return $(this).sparkline("html", {
                    type: "pie",
                    height: height,
                    sliceColors: [Theme.colors.blue, Theme.colors.red, Theme.colors.green, Theme.colors.orange]
                });
            });
            //Sparkline Line
            $(".linechart").each(function() {
                var height;
                height = "18px";
                if ($(this).hasClass("linechart-lg")) {
                    height = "30px";
                }
                return $(this).sparkline("html", {
                    type: "line",
                    height: height,
                    width: "150px",
                    minSpotColor: Theme.colors.red,
                    maxSpotColor: Theme.colors.green,
                    spotRadius: 3,
                    lineColor: Theme.colors.primary,
                    fillColor: "rgba(94,135,176,0.1)",
                    lineWidth: 1.2,
                    highlightLineColor: Theme.colors.red,
                    highlightSpotColor: Theme.colors.yellow
                });
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Fullcalendar
        /*-----------------------------------------------------------------------------------*/
    var handleCalendar = function() {
            /* initialize the external events
            -----------------------------------------------------------------*/

            var initDrag = function(el) {

                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim(el.text()) // use the element's text as the event title
                };

                // store the Event Object in the DOM element so we can get to it later
                el.data('eventObject', eventObject);

                // make the event draggable using jQuery UI
                el.draggable({
                    zIndex: 999,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0 //  original position after the drag
                });

            }

            var addEvent = function(title) {
                title = title.length == 0 ? "Untitled Event" : title;
                var html = $('<div class="external-event">' + title + '</div>');
                jQuery('#event-box').append(html);
                initDrag(html);
            }

            $('#external-events div.external-event').each(function() {
                initDrag($(this))
            });

            $('#add-event').unbind('click').click(function() {
                var title = $('#event-title').val();
                addEvent(title);
            });



        }
        /*-----------------------------------------------------------------------------------*/
        /*	JQVmaps
        /*-----------------------------------------------------------------------------------*/
    var handleJqvmaps = function() {
        var setMap = function(name) {
            var data = {
                map: 'world_en',
                backgroundColor: null,
                borderColor: '#333333',
                borderOpacity: 0.5,
                borderWidth: 1,
                color: Theme.colors.blue,
                enableZoom: true,
                hoverColor: Theme.colors.yellow,
                hoverOpacity: null,
                values: sample_data,
                normalizeFunction: 'linear',
                scaleColors: ['#b6da93', '#427d1a'],
                selectedColor: '#c9dfaf',
                selectedRegion: null,
                showTooltip: true,
                onRegionOver: function(event, code) {
                    //sample to interact with map
                    if (code == 'ca') {
                        event.preventDefault();
                    }
                },
                onRegionClick: function(element, code, region) {
                    //sample to interact with map
                    var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
                    alert(message);
                }
            };

            data.map = name + '_en';
            var map = jQuery('#vmap_' + name);
            if (!map) {
                return;
            }
            map.width(map.parent().width());
            map.vectorMap(data);
        }

        //Init the maps
        setMap("world");
        setMap("usa");
        setMap("europe");
        setMap("russia");
        setMap("germany");
        App.addResponsiveFunction(function() {
            setMap("world");
            setMap("usa");
            setMap("europe");
            setMap("russia");
            setMap("germany");
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Isotope
    /*-----------------------------------------------------------------------------------*/
    var handleIsotope = function() {
        // cache container
        var $container = $('#filter-items');
        // initialize isotope after image loaded
        $container.imagesLoaded(function() {
            $container.isotope({
                // options...
            });

            // filter items when filter link is clicked
            $('#filter-controls a').click(function() {
                var selector = $(this).attr('data-filter');
                $container.isotope({ filter: selector });
                return false;
            });
            // filter on smaller screens
            $("#e1").change(function() {
                var selector = $(this).find(":selected").val();
                $container.isotope({ filter: selector });
                return false;
            });
        });

        function handleIsotopeStretch() {
            var width = $(window).width();
            if (width < 768) {
                $('#filter-items .item').addClass('width-100');
            } else {
                $('#filter-items .item').removeClass('width-100');
            }
        }
        handleIsotopeStretch();
        /* On Resize show menu on desktop if hidden */
        jQuery(window).resize(function() {
            handleIsotopeStretch();
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Handle hover in gallery
    /*-----------------------------------------------------------------------------------*/
    var handleHover = function() {
            $('.filter-content').hover(function() {
                var hoverContent = $(this).children('.hover-content');
                hoverContent.removeClass('fadeOut').addClass('animated fadeIn').show();
            }, function() {
                var hoverContent = $(this).children('.hover-content');
                hoverContent.removeClass('fadeIn').addClass('fadeOut');
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Colorbox
        /*-----------------------------------------------------------------------------------*/
    var handleColorbox = function() {
            $('.colorbox-button').colorbox({ rel: 'colorbox-button', maxWidth: '95%', maxHeight: '95%' });
            /* Colorbox resize function */
            var resizeTimer;

            function resizeColorBox() {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    var myWidth = 442,
                        percentageWidth = .95;
                    if (jQuery('#cboxOverlay').is(':visible')) {
                        $.colorbox.resize({ width: ($(window).width() > (myWidth + 20)) ? myWidth : Math.round($(window).width() * percentageWidth) });
                        $('.cboxPhoto').css({
                            width: $('#cboxLoadedContent').innerWidth(),
                            height: 'auto'
                        });
                        $('#cboxLoadedContent').height($('.cboxPhoto').height());
                        $.colorbox.resize();
                    }
                }, 300)
            }

            // Resize Colorbox when resizing window or changing mobile device orientation
            jQuery(window).resize(resizeColorBox);
            window.addEventListener("orientationchange", resizeColorBox, false);
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Backstretch
        /*-----------------------------------------------------------------------------------*/
    var handleBackstretch = function() {
            $.backstretch([
                "img/login/1.jpg", "img/login/2.jpg", "img/login/3.jpg", "img/login/4.jpg"
            ], { duration: 3000, fade: 750 });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Chat
        /*-----------------------------------------------------------------------------------*/
    var handleChat = function(elem) {
            var append = function() {
                    //Check if chat is empty
                    var input = $('.' + elem + ' .chat-form input');
                    var text = input.val();
                    if (text.length == 0) {
                        return;
                    }

                    //Get time
                    var curr_time = moment().format('YYYY-MM-DD HH:mm:ss');

                    var msg = '';
                    msg += '<li class="animated fadeInLeft media">';
                    msg += '<a class="pull-right" href="#">';
                    msg += '<img class="media-object" alt="Generic placeholder image" src="img/chat/headshot2.jpg">';
                    msg += '</a>';
                    msg += '<div class="pull-right media-body chat-pop mod">';
                    msg += '<h4 class="media-heading">You <span class="pull-left"><abbr id="curr-time" class="timeago" title="' + curr_time + '" >' + curr_time + '</abbr> <i class="fa fa-clock-o"></i></span></h4>';
                    msg += text;
                    msg += '</div>';
                    msg += '</li>';

                    var list = $('.' + elem + ' .chat-list');
                    list.append(msg);
                    jQuery("abbr.timeago").timeago();
                    input.val("");
                    $('.' + elem + ' .scroller').slimScroll({
                        scrollTo: list.height()
                    });
                }
                //If button is pressed
            $('.' + elem + ' .chat-form .btn').click(function(e) {
                e.preventDefault();
                append();
            });

            var input = $('.' + elem + ' .chat-form input');
            //If Enter is pressed
            input.keypress(function(e) {
                if (e.which == 13) {
                    append();
                    return false;
                }
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Timeline
        /*-----------------------------------------------------------------------------------*/
    var handleTimeline = function() {
            createStoryJS({
                type: 'timeline',
                width: '100%',
                height: '600',
                source: 'js/timelinejs/example_json.json',
                embed_id: 'my-timeline',
                debug: true,
                css: 'js/timelinejs/css/timeline.css',
                js: 'js/timelinejs/js/timeline-min.js'
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Slidernav
        /*-----------------------------------------------------------------------------------*/
    var handleSliderNav = function() {
            $('#address-book').sliderNav();

            $('#address-book .slider-content ul li ul li a').click(function(e) {
                e.preventDefault();
                var contact_card = $('#contact-card');
                //Get the name clicked on
                var name = $(this).text();
                //Set the name
                $('#contact-card .panel-title').html(name);
                $('#contact-card #card-name').html(name);
                //Randomize the image
                var img_id = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
                //Set the image
                $('#contact-card .headshot img').attr('src', 'img/addressbook/' + img_id + '.jpg');
                contact_card.removeClass('animated fadeInUp').addClass('animated fadeInUp');
                var wait = window.setTimeout(function() {
                        contact_card.removeClass('animated fadeInUp')
                    },
                    1300
                );
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Active Toggle
        /*-----------------------------------------------------------------------------------*/
    var handleActiveToggle = function() {
            $('#list-toggle .list-group a').click(function() {
                $('#list-toggle .list-group > a.active').removeClass('active');
                $(this).addClass('active');
            })
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handle Box Sortable
        /*-----------------------------------------------------------------------------------*/
    var handleBoxSortable = function() {
            $('.box-container').sortable({
                connectWith: '.box-container',
                items: '> .box',
                opacity: 0.8,
                revert: true,
                forceHelperSize: true,
                placeholder: 'box-placeholder',
                forcePlaceholderSize: true,
                tolerance: 'pointer'
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handles the go to top button at the footer
        /*-----------------------------------------------------------------------------------*/
    var handleGoToTop = function() {
            $('.footer-tools').on('click', '.go-top', function(e) {
                App.scrollTo();
                e.preventDefault();
            });
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handles navbar fixed top
        /*-----------------------------------------------------------------------------------*/
    var handleNavbarFixedTop = function() {
            if (is_mobile && is_fixed_header) {
                //Manage margin top
                $('#main-content').addClass('margin-top-100');
            }
            if (!(is_mobile) && is_fixed_header) {
                //Manage margin top
                $('#main-content').removeClass('margin-top-100').addClass('margin-top-50');
            }
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handles flot charts in dashboard
        /*-----------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------*/
    /*	Handles theme skin switches
    /*-----------------------------------------------------------------------------------*/
    var handleThemeSkins = function() {
            // Handle theme colors
            var setSkin = function(color) {
                $('#skin-switcher').attr("href", "css/themes/" + color + ".css");
                $.cookie('skin_color', color);
            }
            $('ul.skins > li a').click(function() {
                var color = $(this).data("skin");
                setSkin(color);
            });

            //Check which theme skin is set
            if ($.cookie('skin_color')) {
                setSkin($.cookie('skin_color'));
            }
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handles Gritter on Load
        /*-----------------------------------------------------------------------------------*/
    var handleGritter = function() {
            if ($.cookie('gritter_show')) {
                return;
            }

            $.cookie('gritter_show', 1);
            setTimeout(function() {
                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Welcome to Cloud Admin!',
                    // (string | mandatory) the text inside the notification
                    text: 'Cloud is a feature-rich Responsive Admin Dashboard Template with a wide array of plugins!',
                    // (string | optional) the image to display on the left
                    image: 'img/gritter/cloud.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function() {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 12000);
            }, 2000);

            setTimeout(function() {
                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Customize Cloud Admin!',
                    // (string | mandatory) the text inside the notification
                    text: 'Cloud Admin is easily customizable, lightweight and has a great User Experience.',
                    // (string | optional) the image to display on the left
                    image: 'img/gritter/settings.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function() {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 13000);
            }, 8000);

            setTimeout(function() {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    position: 'top-left',
                    // (string | mandatory) the heading of the notification
                    title: 'Buy Cloud Admin!',
                    // (string | mandatory) the text inside the notification
                    text: 'Purchase Cloud Admin theme and get access to future updates at no extra cost. Buy now!',
                    // (string | optional) the image to display on the left
                    image: 'img/gritter/buy.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                // You can have it return a unique id, this can be used to manually remove it later using
                setTimeout(function() {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 15000);

            }, 15000);

            setTimeout(function() {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Notification',
                    // (string | mandatory) the text inside the notification
                    text: 'You have 6 new notifications.',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                setTimeout(function() {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 4000);

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

            }, 20000);

            setTimeout(function() {

                $.extend($.gritter.options, {
                    position: 'top-left'
                });

                var unique_id = $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Inbox',
                    // (string | mandatory) the text inside the notification
                    text: 'You have 5 new messages in your inbox.',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: true,
                    // (int | optional) the time you want it to be alive for before fading out
                    time: '',
                    // (string | optional) the class name you want to apply to that specific message
                    class_name: 'my-sticky-class'
                });

                $.extend($.gritter.options, {
                    position: 'top-right'
                });

                setTimeout(function() {
                    $.gritter.remove(unique_id, {
                        fade: true,
                        speed: 'slow'
                    });
                }, 4000);

            }, 25000);
        }
        /*-----------------------------------------------------------------------------------*/
        /*	Handles Profile Edit
        /*-----------------------------------------------------------------------------------*/
    var handleProfileEdit = function() {
        $(".datepicker").datepicker();
    }
    return {

        //Initialise theme pages
        init: function() {

            if (App.isPage("index")) {

                handleSparkline(); //Function to display Sparkline charts

                handleChat('chat-window'); //Function to handle chat
                handleCalendar(); //Function to display calendar
                //handleGritter(); //Function to display Gritter notifications
            }
            if (App.isPage("widgets_box")) {
                handleBoxSortable(); //Function to handle Box sortables
            }
            if (App.isPage("elements")) {
                handleBootbox(); //Function to display Date Timepicker
                handleMagicSuggest(); //Function to display autosuggest
                handleDateColorpicker(); //Function to handle date and time picker
                handleRaty(); //To show star ratings
                handleTimeAgo(); //Function to handle timestamps
            }
            if (App.isPage("button_icons")) {
                handleStatefulButtons(); //Function to display stateful buttons
                handleToggle(); //Function to handle toggle buttons
            }
            if (App.isPage("sliders_progress")) {
                handleSliders(); //Function to display sliders
                handleProgress(); //Function to display progress bars
                handleKnobs(); //Function to display knobs
            }
            if (App.isPage("treeview")) {
                handleTree(); //Function to handle tree display
            }
            if (App.isPage("nestable_lists")) {
                handleNestableLists(); //Function to handle nestable lists
            }
            if (App.isPage("simple_table")) {
                handleTablecloth(); //Function to display tablecloth.js options
            }
            if (App.isPage("dynamic_table")) {
                handleDataTables(); //Function to display data tables
            }
            if (App.isPage("jqgrid_plugin")) {
                handleJqgrid(); //Function to display jqGrid
            }
            if (App.isPage("forms")) {
                handleTypeahead(); //Function to display autocomplete
                handleAutosize(); //Function to handle textarea autosize
                handleCountable(); //Function to handle char count
                handleSelect2(); //Function to handle select2
                handleUniform(); //Function to handle uniform inputs
                handleTimeAgo(); //Function to handle timestamps
            }
            if (App.isPage("rich_text_editors")) {
                handleWysiwyg(); //Function to display wysiwyg
            }
            if (App.isPage("dropzone_file_upload")) {
                handleDropzone(); //Function to display wysiwyg
            }
            if (App.isPage("xcharts")) {
                handleXcharts(); //Function to display xcharts
            }
            if (App.isPage("others")) {
                handleGage(); //Function to display justgage
                handleEasyPie(); //Function to display easy pie charts
                handleSparkline(); //Function to display sparklines
            }
            if (App.isPage("calendar")) {
                handleCalendar(); //Function to display calendar
                handleUniform(); //Function to handle uniform inputs
            }
            if (App.isPage("vector_maps")) {
                handleJqvmaps(); //Function to display vector maps
            }
            if (App.isPage("gallery")) {
                handleIsotope(); //Function to display portfolio
                handleHover(); //Function to display hover-content
                handleColorbox(); //Function to display colorbox
            }
            if (App.isPage("login")) {
                handleUniform(); //Function to handle uniform inputs
            }
            if (App.isPage("wizards_validations")) {
                handleUniform(); //Function to handle uniform inputs
            }
            if (App.isPage("login_bg")) {
                handleUniform(); //Function to handle uniform inputs
                handleBackstretch(); //Function to handle background images
            }
            if (App.isPage("chats")) {
                handleChat('chat-window'); //Function to handle chat
                handleChat('chat-widget'); //Function to handle chat
                initTimeAgo(); //Function to init timestamps
            }
            if (App.isPage("todo_timeline")) {
                handleTimeline(); //Function to display timeline
            }
            if (App.isPage("address_book")) {
                handleSliderNav(); //Function to display address book
            }
            if (App.isPage("orders")) {
                initTimeAgo(); //Function to init timestamps
            }
            if (App.isPage("faq")) {
                handleActiveToggle(); //Function to handle active toggle
            }
            if (App.isPage("user_profile")) {
                handleProfileSkillPie(); //Function to show skills in pie
                handleSparkline(); //Function to display sparklines
                handleUniform(); //Function to handle uniform inputs
                handleProfileEdit(); //Function to handle profile edit tab
            }
            if (App.isPage("mini_sidebar")) {
                collapseSidebar(); //Function to display mini menu				
            }
            if (App.isPage("fixed_header_sidebar")) {
                handleFixedSidebar(); //Function to display fixed sidebar
            }
            checkLayout(); //Function to check if mini menu/fixed header is activated
            handleSidebar(); //Function to display the sidebar
            handleSidebarCollapse(); //Function to hide or show sidebar
            handleSidebarAndContentHeight(); //Function to hide sidebar and main content height
            responsiveSidebar(); //Function to handle sidebar responsively
            handleTeamView(); //Function to toggle team view
            handleHomePageTooltips(); //Function to handle tooltips


            handleNavbarFixedTop(); //Function to check & handle if navbar is fixed top
            handleThemeSkins(); //Function to handle theme skins
        },

        //Set page
        setPage: function(name) {
            currentPage = name;
        },

        isPage: function(name) {
            return currentPage == name ? true : false;
        },
        //public function to add callback a function which will be called on window resize
        addResponsiveFunction: function(func) {
            responsiveFunctions.push(func);
        },
        // wrapper function to scroll(focus) to an element
        scrollTo: function(el, offeset) {
            pos = (el && el.size() > 0) ? el.offset().top : 0;
            jQuery('html,body').animate({
                scrollTop: pos + (offeset ? offeset : 0)
            }, 'slow');
        },

        // function to scroll to the top
        scrollTop: function() {
            App.scrollTo();
        },
        // initializes uniform elements
        initUniform: function(els) {
            if (els) {
                jQuery(els).each(function() {
                    if ($(this).parents(".checker").size() == 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            } else {
                handleAllUniform();
            }
        },
        // wrapper function to  block element(indicate loading)
        blockUI: function(el, loaderOnTop) {
            lastBlockedUI = el;
            jQuery(el).block({
                message: '<img src="./img/loaders/12.gif" align="absmiddle">',
                css: {
                    border: 'none',
                    padding: '2px',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.05,
                    cursor: 'wait'
                }
            });
        },

        // wrapper function to  un-block element(finish loading)
        unblockUI: function(el) {
            jQuery(el).unblock({
                onUnblock: function() {
                    jQuery(el).removeAttr("style");
                }
            });
        },
    };
}();
(function(a, b) {
    a.fn.admin_tree = function(d) {
        var c = {
            "open-icon": "fa fa-folder-open",
            "close-icon": "fa fa-folder",
            selectable: true,
            "selected-icon": "fa fa-check",
            "unselected-icon": "tree-dot"
        };
        c = a.extend({}, c, d);
        this.each(function() {
            var e = a(this);
            e.html('<div class = "tree-folder" style="display:none;">				<div class="tree-folder-header">					<i class="' + c["close-icon"] + '"></i>					<div class="tree-folder-name"></div>				</div>				<div class="tree-folder-content"></div>				<div class="tree-loader" style="display:none"></div>			</div>			<div class="tree-item" style="display:none;">				' + (c["unselected-icon"] == null ? "" : '<i class="' + c["unselected-icon"] + '"></i>') + '				<div class="tree-item-name"></div>			</div>');
            e.addClass(c.selectable == true ? "tree-selectable" : "tree-unselectable");
            e.tree(c)
        });
        return this
    }
})(window.jQuery);


(function() {
    this.Theme = (function() {
        function Theme() {}
        Theme.colors = {
            white: "#FFFFFF",
            primary: "#5E87B0",
            red: "#D9534F",
            green: "#A8BC7B",
            blue: "#70AFC4",
            orange: "#F0AD4E",
            yellow: "#FCD76A",
            gray: "#6B787F",
            lightBlue: "#D4E5DE",
            purple: "#A696CE",
            pink: "#DB5E8C",
            dark_orange: "#F38630"
        };
        return Theme;
    })();
})(window.jQuery);