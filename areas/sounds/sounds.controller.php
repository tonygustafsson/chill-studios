<?php
	class sounds_controller
	{
		public function __construct()
		{
			$this->opus =& opus::$instance;
		}

		public function index()
		{
			$view_data['page_title'] = "Chill Studios";
			$view_data['css'] = $this->opus->load->css('style');
			$view_data['partial'] = $this->opus->load->view('sounds', array(), TRUE);
			$this->opus->load->view('template', $view_data);
		}

	}
?>