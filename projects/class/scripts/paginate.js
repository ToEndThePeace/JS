//paginate.js # Script that displays and hides list items in order to paginate without refreshing the page
/*
Sample HTML for 3 cols:
<div class="grid clearfix list_surveys">
    <div class="col-1-3">
        <ul>
            <li>Title</li>
            <li data-item-num-NAME="1">Title 1</li>
            <li data-item-num-NAME="2">Title 2</li>
        </ul>
    </div>
    <div class="col-1-3">
        <ul>
            <li>Author</li>
            <li data-item-num-NAME="1">Author 1</li>
            <li data-item-num-NAME="2">Author 2</li>
        </ul>
    </div>
    <div class="col-1-3">
    
    </div>
</div>
<div class="grid clearfix">
    <div class="col-1-1 center">
        <button id="NAME_back">&lt;</button>
        <span id="NAME_range"></span>
        <button id="NAME_next">&gt;</button>
    </div>
</div>
<script type="text/javascript">
    var NAME = new Pages("NAME", MAX_RESULTS(2), 3);
</script>
*/

function O(obj) {
	return document.getElementById(obj);
}
function Pages(name, results, col, inc) {
	this.name = name;
	this.total  = results;
	this.cols   = col;
	this.offset = 0;
	if (this.total < inc) this.inc = this.total;
	else this.inc = inc;
	this.npages = Math.ceil(this.total / this.inc);
	this.page   = 1;
	O(this.name + '_back').setAttribute("onclick", this.name + ".stepBack()");
	O(this.name + '_next').setAttribute("onclick", this.name + ".stepNext()");
	this.showPage();
	this.setRange();
}
Pages.prototype.setRange = function() {
	var x = O(this.name + '_range');
	while (x.firstChild) {
		x.removeChild(x.firstChild);
	}
	for (var i = 1; i <= this.npages; i++) {
		var butt = document.createElement('button');
		var text = document.createTextNode(i);
		butt.appendChild(text);
		if (i == this.page) butt.setAttribute('class', 'alt select');
		else butt.setAttribute('class', 'alt');
		butt.setAttribute("onclick", this.name + ".setPage(" + i + ")")	
		x.appendChild(butt);
	}
}
Pages.prototype.clearAll = function() {
	var x = document.querySelectorAll('[data-item-num-' + this.name + ']');
	for (var i = 0; i < x.length; i++) {
		x[i].style.display = 'none';
	}
}
Pages.prototype.showPage = function() {
	this.clearAll();
	for (var i = 1 + this.offset; i <= this.offset + this.inc; i++) {
		for (var c = 0; c < this.cols; c++) {
			document.querySelectorAll('[data-item-num-' + this.name +'="'+ i +'"]')[c].style.display = 'list-item';
		}
	}
}
Pages.prototype.setPage = function(newPage) {
	this.page = newPage;
	this.offset = (this.page - 1) * this.inc;
	this.setRange();
	this.showPage();
}
Pages.prototype.stepNext = function() {
	if (this.page != this.npages) this.setPage(this.page + 1);
}
Pages.prototype.stepBack = function() {
	if (this.page != 1) this.setPage(this.page - 1)
}