<script>
	var soundFiles = [];
	soundFiles[0] = 'No sound';
	<?php $files = glob($this->opus->path['absolute'] . "/assets/sounds/*.ogg"); ?>
	
	<?php for ($x = 1; $x < count($files); $x++): ?>
		soundFiles[<?=$x?>] = "<?=basename($files[$x])?>";
	<?php endfor; ?>
</script>

<form id="sounds-form" data-sounds-path="<?=$this->opus->url['base'] . '/assets/sounds/'?>">

</form>