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

		<a href="https://github.com/tonygustafsson/chill-studios" class="fork-me">
			<img src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png">
		</a>
	</body>
	</html>