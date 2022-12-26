import React, { useState } from 'react'

import { analytics } from '../../../services/firebase'
import { logEvent } from 'firebase/analytics'

import { Sliders } from 'react-bootstrap-icons'
import { Button, Col, Row, Form, FormLabel, Modal } from 'react-bootstrap'

import { getRandomGenre } from '../../../util/getRandomGenre'

import { FilterForm } from '../../../types'


interface FilterProps {
  getFilteredDiscogsSong: (genre: string, year?: number) => void
  getVideoURL: () => void
}


const Filter = (props: FilterProps) => {
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState<FilterForm>({} as FilterForm)

  // show modal on Filter click
  const handleShow = () => {
    setShow(true)
  }

  // handle user's Year Inputs
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.valueAsNumber })
  }

  // handle user's Genre Selection
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  // reset Form data
  const handleReset = () => {
    setFormData({} as FilterForm)
  }

  // search song based on filter parameters
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault()

    let max = formData.maxYear
    let min = formData.minYear

    if (formData.genre && formData.minYear && formData.maxYear) {
      props.getFilteredDiscogsSong(formData.genre, Math.floor(Math.random() * (max - min) + min))
      props.getVideoURL()
      logEvent(analytics, "filter genre, min & max year", {})
    }

    else if (formData.genre && formData.minYear) {
      props.getFilteredDiscogsSong(formData.genre, Math.floor(Math.random() * (2022 - min) + min))
      props.getVideoURL()
      logEvent(analytics, "filter genre, min year", {})
    }

    else if (formData.genre && formData.maxYear) {
      props.getFilteredDiscogsSong(formData.genre, Math.floor(Math.random() * (max - 1900) + 1900))
      props.getVideoURL()
      logEvent(analytics, "filter genre, max year", {})
    }

    else if (formData.minYear && formData.maxYear) {
      props.getFilteredDiscogsSong(getRandomGenre(), Math.floor(Math.random() * (max - min) + min))
      props.getVideoURL()
      logEvent(analytics, "filter min & max year", {})
    }

    else if (formData.minYear) {
      props.getFilteredDiscogsSong(getRandomGenre(), Math.floor(Math.random() * (2022 - min) + min))
      props.getVideoURL()
      logEvent(analytics, "filter min year", {})
    }

    else if (formData.maxYear) {
      props.getFilteredDiscogsSong(getRandomGenre(), Math.floor(Math.random() * (max - 1900) + 1900))
      props.getVideoURL()
      logEvent(analytics, "filter max year", {})
    }
  }

  return (
    <div>
      <Sliders
        size={40}
        onClick={() => handleShow()}
        style={{ cursor: 'pointer' }}
      />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
          >
            Filter
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <FormLabel>Genre</FormLabel>
              <Form.Select
                onChange={handleSelect}
                name="genre"
                aria-label="Default select example"
              >
                <option value=""></option>
                <option value="Blues">Blues</option>
                <option value="Brass & Military">Brass & Military</option>
                <option value="Classical">Classical</option>
                <option value="Electronic">Electronic</option>
                <option value="Folk, World, & Country">Folk, World, & Country</option>
                <option value="Funk / Soul">Funk / Soul</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Jazz">Jazz</option>
                <option value="Latin">Latin</option>
                <option value="Pop">Pop</option>
                <option value="Reggae">Reggae</option>
              </Form.Select>
            </Form.Group>

            <FormLabel>Year Range</FormLabel>
            <Row className="mb-3">
              <Form.Group as={Col} xs="4" controlId="validationCustom01">
                <Form.Control
                  type="number"
                  min={1900}
                  max={2021}
                  placeholder="1900"
                  onChange={handleInput}
                  name="minYear"
                />
              </Form.Group>
              <Form.Group as={Col} xs="4" controlId="validationCustom02">
                <Form.Control
                  type="number"
                  min={1901}
                  max={2022}
                  placeholder="2022"
                  onChange={handleInput}
                  name="maxYear"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col} xs="3">
                <Button type="reset" onClick={handleReset}>Reset</Button>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} xs="3">
                <Button type="submit">Submit</Button>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div >
  )
}

export default Filter