from machine import Pin
from utime import sleep

sensor_presenca = Pin(16, Pin.IN)
led = Pin(17, Pin.OUT)

led.value(0)

while True:
    leitura_sensor = sensor_presenca.value()
    
    if (leitura_sensor == 1):
        print("Presença detectada")
        led.value(1)
    else:
        print("Nada detectado")
        led.value(0)
        
        
    sleep(0.5)
