<!DOCTYPE html>
<html lang="sv">
	<head>
		<title>
			<?php if (isset($page_title)): ?>
				<?=$page_title?> | <?=$this->opus->config->site_name?>
			<?php else: ?>
				<?= $this->opus->config->site_name?>
			<?php endif; ?>
		</title>

		<?php if (isset($page_description)): ?>
			<meta name="description" content="<?=$page_description?>">
		<?php endif; ?>
		<?php if (isset($page_keywords)): ?>
			<meta name="keywords" content="<?=$page_keywords?>">
		<?php endif; ?>

		<?php if (isset($css)): ?>
			<?php echo $css ?>
		<?php endif; ?>

		<meta charset="utf-8">
	</head>

	<body>
		<div id="background"></div>

		<header>
			<h1><a href="<?=$this->opus->url['base']?>"><?= $this->opus->config->site_name ?></a></h1>
		</header>

		<article id="main">


<?php if (isset($partial)): ?>
	<?=$partial?>
<?php endif; ?>

		</article>

		<footer>
			<p><em>&copy;Tony Gustafsson</em></p>
		</footer>

		<?php echo $this->opus->load->js('queryHelper'); ?>
		<?php echo $this->opus->load->js('musicControl'); ?>

	</body>
	</html>