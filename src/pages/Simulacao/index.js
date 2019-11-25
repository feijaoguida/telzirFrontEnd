import React, { useEffect, useState } from "react";
import api from "../../services/api";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./index.css";

export default function Simulacao({ history }) {
  const [tarifas, setTarifas] = useState([]);
  const [origem, setOrigem] = useState("Origem");
  const [destino, setDestino] = useState("");
  const [tempo, setTempo] = useState("");
  const [plano, setPlano] = useState("");
  const [simulacao, setSimulacao] = useState([{}]);

  useEffect(() => {
    async function loadTarifas() {
      const response = await api.get("/tarifas");

      setTarifas(response.data);
    }
    loadTarifas();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await api
      .post("/simulacao", { tempo, plano, origem, destino })
      .then(resposta => setSimulacao(resposta.data))
      .catch(erro => console.error(erro));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridOrigem">
            <Form.Label>Origem</Form.Label>
            <Form.Control
              as="select"
              value={origem}
              onChange={event => setOrigem(event.target.value)}
            >
              {tarifas.map(tarifa => (
                <option key={tarifa.id}>{tarifa.origem}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDestino">
            <Form.Label>Destino</Form.Label>
            <Form.Control
              as="select"
              value={destino}
              onChange={event => setDestino(event.target.value)}
            >
              {tarifas.map(tarifa => (
                <option key={tarifa.id}>{tarifa.destino}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridTempo">
            <Form.Label>Tempo</Form.Label>
            <Form.Control
              value={tempo}
              onChange={event => setTempo(event.target.value)}
              placeholder="Tempo de chamada"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPlano">
            <Form.Label>plano</Form.Label>
            <Form.Control
              as="select"
              value={plano}
              onChange={event => setPlano(event.target.value)}
            >
              <option value="30">FaleMais 30</option>
              <option value="60">FaleMais 60</option>
              <option value="90">FaleMais 90</option>
              <option value="120">FaleMais120</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCom">
            <Form.Label>Com FaleMais</Form.Label>
            <Form.Control
              defaultValue="0"
              value={simulacao.comFaleMais}
              disabled
              placeholder="Com Fale Mais"
              //onChange={event => setSimulacao.comFaleMais(event.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSem">
            <Form.Label>Sem FaleMais</Form.Label>
            <Form.Control
              defaultValue="0"
              value={simulacao.semFaleMais}
              disabled
              placeholder="Sem Fale Mais"
              //onChange={event => setSimulacao.semFaleMais(event.target.value)}
            />
          </Form.Group>

          <Button id="btn" variant="primary" type="submit">
            Simular
          </Button>
        </Form.Row>
      </Form>
    </>
  );
}
