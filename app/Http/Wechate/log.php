
a:16:{s:5:"appid";s:18:"wx511054a5c81bbc93";s:9:"bank_type";s:3:"CFT";s:8:"cash_fee";s:1:"1";s:8:"fee_type";s:3:"CNY";s:12:"is_subscribe";s:1:"Y";s:6:"mch_id";s:10:"1491959462";s:9:"nonce_str";s:32:"7160vaemz7h7hv1wt9kgkun0huvh5ky1";s:6:"openid";s:28:"onbiM0viuaoaYJ-vVONs92G5ysFo";s:12:"out_trade_no";s:18:"201801051705554220";s:11:"result_code";s:7:"SUCCESS";s:11:"return_code";s:7:"SUCCESS";s:4:"sign";s:32:"629EABAFA349B84BCFA3021F8E81BCD8";s:8:"time_end";s:14:"20180105170614";s:9:"total_fee";s:1:"1";s:10:"trade_type";s:6:"NATIVE";s:14:"transaction_id";s:28:"4200000010201801058654579830";}

<?php
//以下为日志
namespace App\Http\Wechate;
interface ILogHandler
{
	public function write($msg);
	
}

class CLogFileHandler implements ILogHandler
{
	private $handle = null;
	
	public function __construct($file = '')
	{
		$this->handle = fopen($file,'a');
	}
	
	public function write($msg)
	{
		fwrite($this->handle, $msg, 4096);
	}
	
	public function __destruct()
	{
		fclose($this->handle);
	}
}

class Log
{
	private $handler = null;
	private $level = 15;
	
	private static $instance = null;
	
	private function __construct(){}

	private function __clone(){}
	
	public static function Init($handler = null,$level = 15)
	{
		if(!self::$instance instanceof self)
		{
			self::$instance = new self();
			self::$instance->__setHandle($handler);
			self::$instance->__setLevel($level);
		}
		return self::$instance;
	}
	
	
	private function __setHandle($handler){
		$this->handler = $handler;
	}
	
	private function __setLevel($level)
	{
		$this->level = $level;
	}
	
	public static function DEBUG($msg)
	{
		self::$instance->write(1, $msg);
	}
	
	public static function WARN($msg)
	{
		self::$instance->write(4, $msg);
	}
	
	public static function ERROR($msg)
	{
		$debugInfo = debug_backtrace();
		$stack = "[";
		foreach($debugInfo as $key => $val){
			if(array_key_exists("file", $val)){
				$stack .= ",file:" . $val["file"];
			}
			if(array_key_exists("line", $val)){
				$stack .= ",line:" . $val["line"];
			}
			if(array_key_exists("function", $val)){
				$stack .= ",function:" . $val["function"];
			}
		}
		$stack .= "]";
		self::$instance->write(8, $stack . $msg);
	}
	
	public static function INFO($msg)
	{
		self::$instance->write(2, $msg);
	}
	
	private function getLevelStr($level)
	{
		switch ($level)
		{
		case 1:
			return 'debug';
		break;
		case 2:
			return 'info';	
		break;
		case 4:
			return 'warn';
		break;
		case 8:
			return 'error';
		break;
		default:
				
		}
	}
	
	protected function write($level,$msg)
	{
		if(($level & $this->level) == $level )
		{
			$msg = '['.date('Y-m-d H:i:s').']['.$this->getLevelStr($level).'] '.$msg."\n";
			$this->handler->write($msg);
		}
	}
}
