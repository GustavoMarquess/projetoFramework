import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Airplane } from 'react-bootstrap-icons';
import './App.css'; // Certifique-se de importar o CSS corretamente

interface Comentario {
  nome: string;
  comment: string;
  data: string;
}

interface newComentario {
  nome: string;
  comment: string;
}

export default function App() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState<newComentario>({
    nome: '',
    comment: '',
  });

  const publicar = () => {
    if (!novoComentario.nome || !novoComentario.comment) {
      return;
    }

    if (novoComentario.nome && novoComentario.comment) {
      const lista = [
        { ...novoComentario, data: new Date().toLocaleString() },
        ...comentarios,
      ];
      setComentarios(lista);

      setNovoComentario({ nome: '', comment: '' });

      localStorage.setItem('register', JSON.stringify(lista));
    }
  };

  useEffect(() => {
    const arquivo = localStorage.getItem('register');

    if (arquivo) {
      setComentarios(JSON.parse(arquivo));
    }
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form>
            <Form.Group controlId="formAutor" className="mb-3">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome:"
                value={novoComentario.nome}
                onChange={(e) => setNovoComentario({ ...novoComentario, nome: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formComentario" className="mb-3">
              <Form.Label>Comentário</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Texto:"
                value={novoComentario.comment}
                onChange={(e) => setNovoComentario({ ...novoComentario, comment: e.target.value })}
                required
              />
            </Form.Group>

            <Button variant="primary" className="bg-custom-gradient" onClick={publicar}>
              Salvar <Airplane size={18} />
            </Button>
          </Form>

          <h4 className="mt-4">Total de Comentários: {comentarios.length} </h4>

          {comentarios.map((comentario, index) => (
            <Card key={index} className="mb-4">
              <Card.Body>
                <Card.Title>{comentario.nome}</Card.Title>
                <Card.Text>{comentario.comment}</Card.Text>
                <Card.Subtitle className="text-muted">{comentario.data}</Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
