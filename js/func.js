var is_in_borrow=false;
var is_in_return=false;

$(function(){
	$.storage = new $.store();
	
	$("#tabs").tabs();
	tabstyle_def();
	$("#tabs").click(function(){
	
	});
	
	setInterval(function() {(function setfocus(){
		if(is_in_borrow==true){
			$('#barcode_borrow').focus();
		}
		if(is_in_return==true){
			$('#txt_return_item').focus();
		}
	})()}, 1000);

	$('#but_import_data').click(function(){
		var files = $('#import_input')[0].files;
		if(files.length > 0) {
			var file = files[0];
			reader = new FileReader();
			reader.onload = function(e) {
				if(confirm('確定哦？')){
					localStorage.clear();
					var import_data = JSON.parse(e.target.result);
					for(var k in import_data)
						localStorage[k] = import_data[k];
					reloadToFirstView();
				}
			};
			reader.readAsText(file);
		}
		else
			alert('請先選擇檔案');
	});

	$('#but_init').click(function(){
		var files = $('#init_data')[0].files;
		if(files.length > 0) {
			var file = files[0];
			var count_member = 0;
			reader = new FileReader();
			reader.onload = function(e) {
				if(confirm('確定哦？')){
					localStorage.clear();
					fun_def_item();
					var allText = e.target.result;
				    var allTextLines = allText.split(/\r\n|\n/);
				    var headers = allTextLines[0].split(',');
				    for (var i=1; i<allTextLines.length; i++) {
				        var data = allTextLines[i].split(',');
				        if (data.length == headers.length) {
	                		$.storage.set('member_list_'+count_member,data[0]);
							$.storage.set('member_name_'+data[0],data[1]);
							$.storage.set('member_group_'+data[0],data[2]);
							count_member+=1;
				        }
				    }
	    			$.storage.set('issync','1');
					$.storage.set('member_count',count_member);
					$('[href="#tab_member_list"]').click();
				}
			};
			reader.readAsText(file);
		}
		else
			alert('請先選擇檔案');
	});	

	$('#export_file').click(function() {
		exporter.save($('#txt_export').val());
	});

	$('#barcode_borrow').on('keypress', function(e) {
		if(e.keyCode==13) {
			itemStorage.check(this.value);
			this.value = "";
		}
	});
	
	$('#txt_return_item').keyup(function(event){
		if(event.keyCode=='13'){
			var item_id=$('#txt_return_item').val();
			var currentTime = new Date()
			var time_m=''+(currentTime.getMonth()+1);
			var time_d=''+currentTime.getDate();
			var time_y=''+currentTime.getFullYear();
			var time_h=''+currentTime.getHours();
			var time_mm=''+currentTime.getMinutes();
			var time_s=''+currentTime.getSeconds();
			
			if(time_m.length<2)time_m='0'+time_m;
			if(time_d.length<2)time_d='0'+time_d;
			if(time_h.length<2)time_h='0'+time_h;
			if(time_mm.length<2)time_mm='0'+time_mm;
			if(time_s.length<2)time_s='0'+time_s;
			var time_now=time_y+'-'+time_m+'-'+time_d+' '+ time_h + ':' + time_mm + ':' + time_s;
			
			$.storage.set('item_returntime_'+item_id,time_now);
			var member_id=$.storage.get('item_borrow_'+item_id);
			var member_name=$.storage.get('member_name_'+member_id);
			var member_group=$.storage.get('member_group_'+member_id);
			var item_name=$.storage.get('item_name_'+item_id);

			$('#td_return_who').html(member_name+'('+member_group+')');
			$('#td_return_item').html(item_name);
			$('#td_return_msg').html('設備歸還完成！');

			setTimeout(function() {
				$('#td_return_who').html('');
				$('#td_return_item').html('');
				$('#td_return_msg').html('');
				$('#txt_return_item').val('').focus();
			},2000);
			
		}
	});
	initcheck();
});

	function tabstyle_def(){
		/*table 顏色設定*/
		$('.tabstyle_def').find('thead th').addClass('tablestyle_def_color_th');
		$('.tabstyle_def').find('tbody th').addClass('tablestyle_def_color_th');
		$('.tabstyle_def').find('tbody tr:odd').addClass('tablestyle_def_color_tr');
		$('.tabstyle_def').find('tbody tr:even').addClass('tablestyle_def_color_tr2');
		$('.tabstyle_def tbody tr').mouseover(function(){$(this).addClass('tablestyle_def_hover');}).mouseout(function(){$(this).removeClass('tablestyle_def_hover');});
		/*==============*/
	}
	
	function initcheck(){
		var issync = $.storage.get('issync');
		if(issync!='1'){
			alert('資料表中無資料，請先初始化資料！');
			$('[href="#tab_INIT"]').click();
		}
		else
			load_item();
	}

	function load_item(){
		$('#tab_item_list table tbody').html('');
		var item_count = $.storage.get('item_count');
		$('#sp_item_count').html(item_count);
		var isborrow=0;
		for(i=0;i<item_count;i++){
			var item_id=$.storage.get('item_list_'+i);
			var item_name=$.storage.get('item_name_'+item_id);
			var item_borrow_member_id=$.storage.get('item_borrow_'+item_id);
			var item_borrowtime=$.storage.get('item_borrowtime_'+item_id);
			var item_returntime=$.storage.get('item_returntime_'+item_id);
			var item_borrow_member_name='';
			var item_borrow_member_group='';
			if(item_borrow_member_id!=''){
				item_borrow_member_name=$.storage.get('member_name_'+item_borrow_member_id);
				item_borrow_member_group=$.storage.get('member_group_'+item_borrow_member_id);
			}
			var htmlplus='';
			if(item_borrowtime!='' && item_returntime==''){
				htmlplus='style="background-color: FFD8AF;"';
			}
			
			var html='';
			html+='<tr '+htmlplus+'>';
			html+='<td>'+item_id+'</td>';
			html+='<td>'+item_name+'</td>';
			if(item_borrow_member_id!=''){
				html+='<td>'+item_borrow_member_id+' '+item_borrow_member_name+'('+item_borrow_member_group+')'+'</td>';
			}else{
				html+='<td></td>';
			}
			html+='<td align="center">'+item_borrowtime+'</td>';
			html+='<td align="center">'+item_returntime+'</td>';
			html+='</tr>';
			$('#tab_item_list table tbody').append(html);
			if(item_borrowtime!='' && item_returntime==''){
				isborrow+=1;
			}
		}
		$('#sp_item_count_borrow').html(isborrow);
		tabstyle_def();
	}

	function load_member(){
		$('#tab_member_list table tbody').html('');
		var member_count = $.storage.get('member_count');
		$('#sp_member_count').html(member_count);
		for(i=0;i<member_count;i++){
			
			var member_id=$.storage.get('member_list_'+i);
			var member_name=$.storage.get('member_name_'+member_id);
			var member_group=$.storage.get('member_group_'+member_id);
			var count_borrow=count_borrow_item(member_id);
			
			var htmlplus='';
			if(count_borrow!=0){
				htmlplus='style="background-color: FFD8AF;"';
			}else{
				count_borrow='';
			}
			var html='';
			html+='<tr '+htmlplus+'>';
			html+='<td>'+member_id+'</td>';
			html+='<td>'+member_name+'</td>';
			html+='<td>'+member_group+'</td>';
			html+='<td align="center">'+count_borrow+'</td>';
			html+='</tr>';
			$('#tab_member_list table tbody').append(html);
		}
		tabstyle_def();
	}

	function count_borrow_item(member_id){
		var item_count = $.storage.get('item_count');
		var count=0;
		var item_id;
		for(j=0;j<item_count;j++){
			item_id=$.storage.get('item_list_'+j);
			if( member_id==$.storage.get('item_borrow_'+item_id)){
				if($.storage.get('item_returntime_'+item_id)==''){
					count+=1;
				}
			}
		}
		return count;
	}
	
	function load_borrow(){
		is_in_borrow = true;
		$('#txt_borrow_item').val('');
		$('#txt_borrow_who').val('').focus();
	}

	function load_return(){
		is_in_return = true;
		$('#txt_return_item').val('').focus();
	}

	function data_IO(){
		$('#tab_data_IO').val('').focus();
		$('#txt_export').val(JSON.stringify(localStorage)).focus();
	}

	function download_sample(){
		exporter.save("人員編號,人員暱稱,人員組別\n", "memberList.csv");
	}

	function reloadToFirstView() {
		$('[href="#tab_item_list"]').click();
	}

	function sprintf(format, etc) {
		var arg = arguments;
		var i = 1;
		return format.replace(/%((%)|s)/g, function (m) { return m[2] || arg[i++] });
	}

	var itemStorage = new function itemStorage() {
		this.check = function check(value) {
			if(value.match(/^\d{3}$/))
				this.showWho(value);
			else
				this.showDevice(value);

			var currentTime = new Date()
			var time_m=''+(currentTime.getMonth()+1);
			var time_d=''+currentTime.getDate();
			var time_y=''+currentTime.getFullYear();
			var time_h=''+currentTime.getHours();
			var time_mm=''+currentTime.getMinutes();
			var time_s=''+currentTime.getSeconds();
			
			if(time_m.length<2)time_m='0'+time_m;
			if(time_d.length<2)time_d='0'+time_d;
			if(time_h.length<2)time_h='0'+time_h;
			if(time_mm.length<2)time_mm='0'+time_mm;
			if(time_s.length<2)time_s='0'+time_s;

			this.borrow(time_y+'-'+time_m+'-'+time_d+' '+ time_h + ':' + time_mm + ':' + time_s);
		}
		this.showWho = function showWho(member_id) {
			var member_name=$.storage.get('member_name_'+member_id);
			var member_group=$.storage.get('member_group_'+member_id);
			$('#td_borrow_who').html(member_name+'('+member_group+')');
			$('#txt_borrow_who').text(member_id);
		}
		this.showDevice = function showDevice(item_id) {
			var item_name=$.storage.get('item_name_'+item_id);
			$('#td_borrow_item').html(item_name);
			$('#txt_borrow_item').text(item_id);
		}
		this.borrow = function borrow(time_now) {
			var member_id = $('#txt_borrow_who').text();
			var item_id = $('#txt_borrow_item').text();
			if(item_id.length > 0 && member_id.length > 0) {
				$.storage.set('item_borrow_'+item_id,member_id);
				$.storage.set('item_borrowtime_'+item_id,time_now);
				$.storage.set('item_returntime_'+item_id,'');
				
				$('#td_borrow_msg').html('設備借出成功！');
				setTimeout(function() {
					$('#txt_borrow_item').text('');
					$('#txt_borrow_who').text('');
					$('#td_borrow_item').text('');
					$('#td_borrow_who').text('');
					$('#td_borrow_msg').html('');
				}, 1000);
			}
		}
	}

	var exporter = new function exporter() {
		this.createBlobArray = function createBlobArray(blob) {
			var ua = new Uint8Array(blob.length);
			for(var i = 0; i < blob.length; i++)
				ua[i] = blob.charCodeAt(i);
			return ua;
		}
		this.createBlob = function createBlob(obj) {
			if(obj.output == "DataURI")
				return sprintf('data:%s;%s,%s', obj['Content-Type'], obj.encoding, obj.content);
			if(obj.output == "blob")
				return new Blob([((obj.encoding == "base64") ? this.createBlobArray(atob(obj.content)) : obj.content)], {type: obj['Content-Type']});
		}
		this.createBlobURL = function createBlobURL(blob) {
			var URLObj = window.URL || window.webkitURL;
			return URLObj.createObjectURL(blob);
		}
		this.createBlobDownload = function createBlobDownload(obj) {
			var a = $('<a/>').attr('href', this.createBlobURL(this.createBlob(obj))).attr('download', obj.filename);
			a[0].dataset.downloadurl = [obj['Content-Type'], obj.filename, a.attr('href')].join(':');
			return a;
		}
		this.save = function save(data, filename) {
			if(!filename) filename = "Radio" + moment().format('YYYYMMDD-HHmmss') + ".json.txt";
			if(!!data)
				$(this.createBlobDownload({
									"Content-Type": "text/xml",
									"encoding": "string",
									"output": "blob",
									"content": data,
									"filename": filename
								}))[0].click();
		}
	}
