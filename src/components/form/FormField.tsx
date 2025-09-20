import type { TextInputProps, TextAreaProps } from '../../types/form';

interface ErrorMessageProps {
  id: string;
  message: string;
}

const ErrorMessage = ({ id, message }: ErrorMessageProps) => (
  <div
    id={id}
    role="alert"
    aria-live="polite"
    className="error-message"
  >
    {message}
  </div>
);

export const TextInput = ({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  required = false,
  register
}: TextInputProps) => {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label} {required && '*'}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        aria-describedby={errorId}
        aria-invalid={!!error}
        aria-required={required}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {error && <ErrorMessage id={errorId!} message={error} />}
    </div>
  );
};

export const TextArea = ({
  id,
  label,
  rows = 6,
  placeholder,
  error,
  required = false,
  register
}: TextAreaProps) => {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label} {required && '*'}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register}
        aria-describedby={errorId}
        aria-invalid={!!error}
        aria-required={required}
        className={`form-textarea ${error ? 'error' : ''}`}
      />
      {error && <ErrorMessage id={errorId!} message={error} />}
    </div>
  );
};