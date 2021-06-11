CREATE OR REPLACE FUNCTION verifica_aluno()
RETURNS TRIGGER AS $$
DECLARE
	tamanho INTEGER := 0;
	fileira aluno%rowtype;

	erro BOOLEAN := false;
	textoerro VARCHAR(50);
BEGIN
	FOR fileira IN SELECT * FROM aluno
	LOOP
		IF fileira.idAluno IS NULL THEN
			erro := true; 
			textoerro := "Id de Aluno " || fileira.nomeAluno || " não pode ser núlo.";
			RETURN
		ELSE 
			IF fileira.idAluno < 0 THEN
				erro := true; 
				textoerro := "Id de Aluno " || fileira.nomeAluno || " Inválido.";
			END IF;
		END IF;
		
		IF fileira.cra IS NULL THEN
			erro := true; 
			textoerro := "CRA de Aluno " || fileira.nomeAluno || " não pode ser núlo.";
		ELSE 
			IF fileira.cra < 0 THEN
				erro := true; 
				textoerro := "CRA de Aluno " || fileira.nomeAluno || " Inválido.";
			END IF;
		END IF;

		tamanho := LENGTH(fileira.telefone);

		IF tamanho IS NULL THEN
			erro := true; 
			textoerro := "Telefone de Aluno " || fileira.nomeAluno || " não pode ser núlo.";
		ELSE 
			IF tamanho < 0 THEN
				erro := true; 
				textoerro := "Telefone de Aluno " || fileira.nomeAluno || " Inválido.";
			END IF;
		END IF;

		IF erro THEN
			
			RAISE EXCEPTION "Após a query foi possível encontrar este erro na tabela Aluno: " || textoerro;
	END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verifica_aluno
AFTER INSERT OR UPDATE OR DELETE ON aluno
FOR EACH STATEMENT EXECUTE PROCEDURE verifica_aluno();