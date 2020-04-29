import React from 'react'
import { Route, Switch, Redirect, Router } from 'react-router-dom'
import Search from '../components/search'
import Movies from '../components/movies'
import Series from '../components/series'
import DetailedMovie from '../components/detailedMovie'
import DetailedSerie from '../components/detailedSerie'

const router = () => {
  return (
    <Switch>
      <Route path="/movie" component={DetailedMovie} />
      <Route path="/serie" component={DetailedSerie} />
      <Route exact path="/" component={Search} />
      <Route path="/movies" component={Movies} />
      <Route path="/series" component={Series} />
      <Route path="/search" component={Search} />

    </Switch>
  )
}

export default router
