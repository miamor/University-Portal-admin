<h2>Users</h2>

<form id="formFilter" class="filterBox filters">
	<h3 class="filterBox-header">Filter</h3>
	<div class="filter-status form-group">
		<div class="col-lg-4 text-right">Status</div>
		<div class="col-lg-6">
			<label class="radio col-lg-3">
				<input type="radio" value="1" name="status"/> Show
			</label>
			<label class="radio col-lg-3">
				<input type="radio" value="0" name="status"/> Hide
			</label>
			<label class="radio col-lg-3">
				<input type="radio" value="-1" checked name="status"/> All
			</label>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="center">
		<input type="submit" value="Lọc"/>
	</div>
</form>

<div class="">
	<table id="buyList" class="table table-bordered table-striped">
		<thead>
			<tr>
			  <th>ID</th>
			  <th>Coins</th>
			  <th>Type</th>
			  <th>User</th>
			  <th>Staff</th>
			  <th>Date</th>
		  </tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>

<div class="clearfix"></div>
