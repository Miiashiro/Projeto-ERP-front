import React from "react";
import { NumericFormat, PatternFormat } from 'react-number-format';

//Estilo dos modais
const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

//Mascara de telefone
const TextMaskTel = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <PatternFormat
    {...other}
    getInputRef={ref}
    onValueChange={(values) => {
      onChange({
        target: {
          name: props.name,
          value: values.value,
        },
      });
    }}
    format="## (##) ####-#### "
    />
  );
});

//Mascara de cnpj
const TextMaskCnpj = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <PatternFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="##.###.###/####-##"
    />
  );
});

//mascara de cep
const TextMaskCep = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <PatternFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="#####-###"
    />
  );
});

//mascara de preço em reais
const priceCustom = React.forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        decimalScale={2}
        fixedDecimalScale={true}

        thousandSeparator={[","]}
        allowedDecimalSeparators={['.']}
        prefix="R$"
      />
    );
  },
);

export default { style, TextMaskTel, TextMaskCnpj, TextMaskCep, priceCustom }