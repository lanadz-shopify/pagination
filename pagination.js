jQuery ->
  array_articles = $("#fav_holder").find(".article")
  amount = array_articles.length
  page_wrapper = $("<div></div>")
  paging_wrapper = $(".paging")
  view_port = $(".page_split")

  i = 0
  page_num = 1

# split pages
  page_amount = Math.ceil(amount / 6)
  for article in array_articles
    i++
    page_wrapper.append article
    if i % 6 is 0
      page_wrapper.addClass("page_#{page_num}").addClass("clearfix")
      page_num++
      view_port.append page_wrapper.clone()
      page_wrapper=$("<div></div>")
  view_port.append page_wrapper.addClass("page_#{page_num}").addClass("clearfix")

# Paging dots
  paging_wrapper.show() if amount > 0
  i=0
  while i < page_amount
    paging_wrapper.append($("<div class='page'></div>"))
    i++
  view_port_height = 560
  current_top = parseInt(view_port.css('top'))
  current_page = Math.ceil(current_top/view_port_height) + 1
  $(".page:nth-child(#{current_page})").addClass("current")

#  Paginator click
  $(".page").on 'click', (event) ->
    view_port.css('top', -1*view_port_height*$(this).index() + "px") #push it!
    $('.page').removeClass('current')
    selector = ".page:nth-child(#{$(this).index()+1})"
    $(selector).addClass('current')

  $('.delete-bookmark').on 'click', (event) ->
    $(this).parent().animate({
      width: 0,
      opacity: 0
    }, 300, 'linear', -> $(this).remove())


