refine connection SMB_Conn += {

	function proc_smb1_logoff_andx(header: SMB_Header, val: SMB1_logoff_andx): bool
		%{
		if ( smb1_logoff_andx )
			BifEvent::generate_smb1_logoff_andx(bro_analyzer(), bro_analyzer()->Conn(), ${val.is_orig});

		return true;
		%}

};

type SMB1_logoff_andx(header: SMB_Header, is_orig: bool) = record {
	word_count  : uint8;
	andx        : SMB_andx;
	byte_count  : uint16;
} &let {
	proc : bool = $context.connection.proc_smb1_logoff_andx(header, this);
};