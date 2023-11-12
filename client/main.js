import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { App } from '../ui/App';
import { ChakraProvider } from "@chakra-ui/react";


Meteor.startup(() => {
  const root = createRoot(document.getElementById('app'));
  root.render(
    <ChakraProvider>
      <App />
    </ChakraProvider>  );
});
