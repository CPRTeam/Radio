function fun_def_item(){
	//RDOKNU001 ~ 050
	var count_items = 0;
	var header='RDOKNU';
	for(var i=1;i<=50;i++){
		var tmp=''+i;
		if(i<10)tmp='0'+tmp;
		if(i<100)tmp='0'+tmp;
		tmp=header+tmp;
		
		$.storage.set('item_list_'+count_items,tmp);
		$.storage.set('item_name_'+tmp,'無線電');
		$.storage.set('item_borrow_'+tmp,'');
		$.storage.set('item_borrowtime_'+tmp,'');
		$.storage.set('item_returntime_'+tmp,'');
		count_items+=1;
	}
	$.storage.set('item_count',count_items);
}